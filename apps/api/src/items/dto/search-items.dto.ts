import { IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class SearchItemsDto extends PaginationDto {
  @IsOptional() @IsString() q?: string;
  @IsOptional() @IsUUID() categoryId?: string;
  @IsOptional() @IsUUID() campusId?: string;
  @IsOptional() @IsString() color?: string;
  @IsOptional() @IsString() brand?: string;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsString() dateFrom?: string;
  @IsOptional() @IsString() dateTo?: string;
}
