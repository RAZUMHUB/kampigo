import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  AuthenticatedUser,
  CurrentUser,
} from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { TenantGuard } from '../common/guards/tenant.guard';

import { CreateRideDto } from './dto/create-ride.dto';
import { SearchRidesDto } from './dto/search-rides.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { RidesService } from './rides.service';

@UseGuards(JwtAuthGuard, TenantGuard)
@Controller('rides')
export class RidesController {
  constructor(private readonly service: RidesService) {}

  @Post()
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateRideDto,
  ) {
    return this.service.create(user.id, user.universityId, dto);
  }

  @Get()
  search(
    @CurrentUser() user: AuthenticatedUser,
    @Query() dto: SearchRidesDto,
  ) {
    return this.service.search(user.universityId, dto);
  }

  @Get(':id')
  findOne(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
  ) {
    return this.service.findById(id, user.universityId);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: UpdateRideDto,
  ) {
    return this.service.update(
      id,
      user.id,
      user.universityId,
      dto,
    );
  }
}