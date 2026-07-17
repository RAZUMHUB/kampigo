import {
  BadRequestException,
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { TenantGuard } from '../common/guards/tenant.guard';
import { CurrentUser, AuthenticatedUser } from '../common/decorators/current-user.decorator';
import { PrismaService } from '../common/prisma/prisma.service';
import { ImageValidationService } from '../storage/image-validation.service';
import { S3CompatibleStorageProvider } from '../storage/providers/s3-compatible.provider';
import { randomUUID } from 'crypto';

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_IMAGES_PER_ITEM = 6;

@UseGuards(JwtAuthGuard, TenantGuard)
@Controller()
export class ItemImagesController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imageValidation: ImageValidationService,
    private readonly storage: S3CompatibleStorageProvider,
  ) {}

  @Post('lost-items/:id/images')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: MAX_IMAGE_BYTES } }))
  async uploadLostItemImage(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const item = await this.prisma.lostItem.findUnique({ where: { id } });
    if (!item || item.universityId !== user.universityId) throw new BadRequestException('Item not found');
    if (item.ownerId !== user.id) throw new BadRequestException('Not the owner of this report');

    const count = await this.prisma.itemImage.count({ where: { lostItemId: id } });
    if (count >= MAX_IMAGES_PER_ITEM) throw new BadRequestException('Maximum images per item reached');

    return this.storeImage(file, { lostItemId: id });
  }

  @Post('found-items/:id/images')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: MAX_IMAGE_BYTES } }))
  async uploadFoundItemImage(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const item = await this.prisma.foundItem.findUnique({ where: { id } });
    if (!item || item.universityId !== user.universityId) throw new BadRequestException('Item not found');

    const count = await this.prisma.itemImage.count({ where: { foundItemId: id } });
    if (count >= MAX_IMAGES_PER_ITEM) throw new BadRequestException('Maximum images per item reached');

    return this.storeImage(file, { foundItemId: id });
  }

  private async storeImage(
    file: Express.Multer.File,
    itemRef: { lostItemId?: string; foundItemId?: string },
  ) {
    if (!file) throw new BadRequestException('No file uploaded');

    // Validate real file bytes - never trust the client's declared MIME type/extension.
    const format = this.imageValidation.validateMagicBytes(file.buffer);
    const stripped = await this.imageValidation.stripExif(file.buffer, format);

    const key = `items/${itemRef.lostItemId ?? itemRef.foundItemId}/${randomUUID()}.${format}`;
    const contentType = this.imageValidation.contentTypeFor(format);

    await this.storage.putObject(key, stripped, contentType);

    return this.prisma.itemImage.create({
      data: {
        lostItemId: itemRef.lostItemId,
        foundItemId: itemRef.foundItemId,
        storageKey: key,
        exifStripped: true,
      },
    });
  }
}
