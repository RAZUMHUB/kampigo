import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OtpPurpose } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from '../common/prisma/prisma.service';
import { OtpService } from './otp.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly otpService: OtpService,
    private readonly jwtService: JwtService,
  ) {}

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  async requestRegistrationOtp(
    universityId: string,
    campusId: string,
    institutionalEmail: string,
    displayName: string,
    password: string,
    ip?: string,
  ) {
    const email = this.normalizeEmail(institutionalEmail);

    const existing = await this.prisma.user.findUnique({
      where: {
        institutionalEmail: email,
      },
    });

    if (existing) {
      throw new ConflictException(
        'An account already exists for this email. Try logging in.',
      );
    }

    const campus = await this.prisma.campus.findFirst({
      where: {
        id: campusId,
        universityId,
      },
    });

    if (!campus) {
      throw new BadRequestException(
        'Selected campus does not belong to this university',
      );
    }

    if (displayName.trim().length < 2) {
      throw new BadRequestException('Please enter your full name');
    }

    if (password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters');
    }

    return this.otpService.requestOtp({
      universityId,
      institutionalEmail: email,
      purpose: OtpPurpose.REGISTRATION,
      requestIp: ip,
    });
  }

  async verifyRegistration(params: {
    universityId: string;
    campusId: string;
    institutionalEmail: string;
    code: string;
    displayName: string;
    password: string;
  }) {
    const email = this.normalizeEmail(params.institutionalEmail);

    const existing = await this.prisma.user.findUnique({
      where: {
        institutionalEmail: email,
      },
    });

    if (existing) {
      throw new ConflictException(
        'An account already exists for this email. Try logging in.',
      );
    }

    const campus = await this.prisma.campus.findFirst({
      where: {
        id: params.campusId,
        universityId: params.universityId,
      },
    });

    if (!campus) {
      throw new BadRequestException(
        'Selected campus does not belong to this university',
      );
    }

    await this.otpService.verifyOtp({
      universityId: params.universityId,
      institutionalEmail: email,
      code: params.code,
      purpose: OtpPurpose.REGISTRATION,
    });

    const passwordHash = await argon2.hash(params.password);

    const user = await this.prisma.user.create({
      data: {
        universityId: params.universityId,
        campusId: params.campusId,
        institutionalEmail: email,
        displayName: params.displayName.trim(),
        passwordHash,
      },
    });

    await this.prisma.wallet.upsert({
      where: {
        userId: user.id,
      },
      create: {
        userId: user.id,
        universityId: user.universityId,
      },
      update: {},
    });

    return this.issueTokens(user.id, user.universityId, user.role);
  }

  async requestLoginOtp(
    universityId: string,
    institutionalEmail: string,
    password: string,
    ip?: string,
  ) {
    const email = this.normalizeEmail(institutionalEmail);

    const user = await this.prisma.user.findUnique({
      where: {
        institutionalEmail: email,
      },
    });

    if (
      !user ||
      user.universityId !== universityId ||
      !user.isActive ||
      !user.passwordHash
    ) {
      throw new UnauthorizedException('Invalid university, email or password');
    }

    const passwordValid = await argon2.verify(user.passwordHash, password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid university, email or password');
    }

    return this.otpService.requestOtp({
      universityId,
      institutionalEmail: email,
      purpose: OtpPurpose.LOGIN,
      requestIp: ip,
    });
  }

  async verifyLogin(params: {
    universityId: string;
    institutionalEmail: string;
    code: string;
  }) {
    const email = this.normalizeEmail(params.institutionalEmail);

    const user = await this.prisma.user.findUnique({
      where: {
        institutionalEmail: email,
      },
    });

    if (
      !user ||
      user.universityId !== params.universityId ||
      !user.isActive ||
      !user.passwordHash
    ) {
      throw new UnauthorizedException('Account not found for this university');
    }

    await this.otpService.verifyOtp({
      universityId: params.universityId,
      institutionalEmail: email,
      code: params.code,
      purpose: OtpPurpose.LOGIN,
    });

    return this.issueTokens(user.id, user.universityId, user.role);
  }

  private issueTokens(userId: string, universityId: string, role: string) {
    const payload = {
      sub: userId,
      universityId,
      role,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET ?? 'dev-only-insecure-secret',
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret:
        process.env.JWT_REFRESH_SECRET ?? 'dev-only-insecure-refresh-secret',
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
