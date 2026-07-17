import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  // --- University Admin scope (always filtered by universityId) ---

  async universityOverview(universityId: string) {
    const [lostCount, foundCount, activeAlerts, pendingClaims, openReports] = await Promise.all([
      this.prisma.lostItem.count({ where: { universityId } }),
      this.prisma.foundItem.count({ where: { universityId } }),
      this.prisma.universityAlert.count({ where: { universityId, status: { in: ['PENDING', 'QUEUED'] } } }),
      this.prisma.claim.count({ where: { foundItem: { universityId }, status: { in: ['PENDING', 'VERIFICATION_REQUIRED'] } } }),
      this.prisma.contentReport.count({ where: { resolved: false } }),
    ]);
    return { lostCount, foundCount, activeAlerts, pendingClaims, openReports };
  }

  async recoveryAnalytics(universityId: string) {
    const [totalLost, recovered] = await Promise.all([
      this.prisma.lostItem.count({ where: { universityId } }),
      this.prisma.lostItem.count({ where: { universityId, status: 'RECOVERED' } }),
    ]);
    return { totalLost, recovered, recoveryRate: totalLost ? recovered / totalLost : 0 };
  }

  async listAlertActivity(universityId: string) {
    return this.prisma.universityAlert.findMany({ where: { universityId }, orderBy: { createdAt: 'desc' }, take: 100 });
  }

  async listContentReports(universityId: string) {
    return this.prisma.contentReport.findMany({
      where: { reporter: { universityId } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async manageCampusAuthority(universityId: string, userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.universityId !== universityId) throw new Error('User not in this university');
    return this.prisma.user.update({ where: { id: userId }, data: { role: 'CAMPUS_AUTHORITY' } });
  }

  // --- Campus Authority scope ---

  async authorityHeldItems(universityId: string) {
    return this.prisma.foundItem.findMany({
      where: { universityId, custodyStatus: { in: ['SUBMITTED_TO_SECURITY', 'SUBMITTED_TO_OFFICE', 'SECURED_BY_AUTHORITY'] } },
      orderBy: { createdAt: 'desc' },
    });
  }

  // --- Platform Super Admin scope (cross-tenant, restricted to this role only) ---

  async listAllUniversities() {
    return this.prisma.university.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async onboardUniversity(name: string, slug: string) {
    return this.prisma.university.create({ data: { name, slug, status: 'ONBOARDING' } });
  }

  async setUniversityStatus(universityId: string, status: 'ACTIVE' | 'SUSPENDED' | 'ONBOARDING') {
    return this.prisma.university.update({ where: { id: universityId }, data: { status } });
  }

  async platformAnalytics() {
    const [universities, users, lostItems, foundItems, matches, claims] = await Promise.all([
      this.prisma.university.count(),
      this.prisma.user.count(),
      this.prisma.lostItem.count(),
      this.prisma.foundItem.count(),
      this.prisma.itemMatch.count(),
      this.prisma.claim.count(),
    ]);
    return { universities, users, lostItems, foundItems, matches, claims };
  }

  async paymentSystemHealth() {
    const [pendingTopups, failedTopups] = await Promise.all([
      this.prisma.walletLedgerEntry.count({ where: { reason: 'TOPUP', status: 'PENDING' } }),
      this.prisma.walletLedgerEntry.count({ where: { reason: 'TOPUP', status: 'FAILED' } }),
    ]);
    return { pendingTopups, failedTopups };
  }

  async notificationSystemHealth() {
    const [pendingAlerts, failedAlerts] = await Promise.all([
      this.prisma.universityAlert.count({ where: { status: { in: ['PENDING', 'QUEUED'] } } }),
      this.prisma.universityAlert.count({ where: { status: 'FAILED' } }),
    ]);
    return { pendingAlerts, failedAlerts };
  }
}
