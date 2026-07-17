import { Injectable } from '@nestjs/common';
import { GmailEmailProvider } from './providers/gmail.provider';

@Injectable()
export class EmailService {
  constructor(private readonly provider: GmailEmailProvider) {}

  async sendOtpEmail(
    to: string,
    code: string,
    ttlMinutes: number,
  ): Promise<void> {
    await this.provider.send({
      to,
      subject: 'Your LostFound verification code',
      text: `Your LostFound verification code is ${code}. It expires in ${ttlMinutes} minutes. If you did not request this, ignore this email.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px;">
          <h2>LostFound Verification</h2>

          <p>Your verification code is:</p>

          <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 24px 0;">
            ${code}
          </div>

          <p>This code expires in ${ttlMinutes} minutes.</p>

          <p>If you did not request this code, you can ignore this email.</p>
        </div>
      `,
    });
  }
}
