import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { TenantGuard } from '../common/guards/tenant.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser, AuthenticatedUser } from '../common/decorators/current-user.decorator';
import { AdminService } from './admin.service';
import { IsString } from 'class-validator';

class UpdateUniversityStatusDto {
  @IsString() status: 'ACTIVE' | 'SUSPENDED' | 'ONBOARDING';
}
class OnboardUniversityDto {
  @IsString() name: string;
  @IsString() slug: string;
}

// University Admin + Campus Authority - always tenant scoped.
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('admin/university')
export class UniversityAdminController {
  constructor(private readonly adminService: AdminService) {}

  @Roles('UNIVERSITY_ADMIN')
  @Get('overview')
  overview(@CurrentUser() user: AuthenticatedUser) {
    return this.adminService.universityOverview(user.universityId);
  }

  @Roles('UNIVERSITY_ADMIN')
  @Get('recovery-analytics')
  recoveryAnalytics(@CurrentUser() user: AuthenticatedUser) {
    return this.adminService.recoveryAnalytics(user.universityId);
  }

  @Roles('UNIVERSITY_ADMIN')
  @Get('alerts')
  alerts(@CurrentUser() user: AuthenticatedUser) {
    return this.adminService.listAlertActivity(user.universityId);
  }

  @Roles('UNIVERSITY_ADMIN')
  @Get('content-reports')
  contentReports(@CurrentUser() user: AuthenticatedUser) {
    return this.adminService.listContentReports(user.universityId);
  }

  @Roles('UNIVERSITY_ADMIN')
  @Patch('campus-authorities/:userId')
  grantCampusAuthority(@CurrentUser() user: AuthenticatedUser, @Param('userId') userId: string) {
    return this.adminService.manageCampusAuthority(user.universityId, userId);
  }

  @Roles('CAMPUS_AUTHORITY', 'UNIVERSITY_ADMIN')
  @Get('held-items')
  heldItems(@CurrentUser() user: AuthenticatedUser) {
    return this.adminService.authorityHeldItems(user.universityId);
  }
}

// Platform Super Admin - explicitly cross-tenant, gated by role only.
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('PLATFORM_SUPER_ADMIN')
@Controller('admin/platform')
export class PlatformAdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('universities')
  listUniversities() {
    return this.adminService.listAllUniversities();
  }

  @Post('universities')
  onboardUniversity(@Body() dto: OnboardUniversityDto) {
    return this.adminService.onboardUniversity(dto.name, dto.slug);
  }

  @Patch('universities/:id/status')
  setStatus(@Param('id') id: string, @Body() dto: UpdateUniversityStatusDto) {
    return this.adminService.setUniversityStatus(id, dto.status);
  }

  @Get('analytics')
  analytics() {
    return this.adminService.platformAnalytics();
  }

  @Get('payments/health')
  paymentsHealth() {
    return this.adminService.paymentSystemHealth();
  }

  @Get('notifications/health')
  notificationsHealth() {
    return this.adminService.notificationSystemHealth();
  }
}
