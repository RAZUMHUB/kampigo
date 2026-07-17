import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { GmailEmailProvider } from './providers/gmail.provider';

@Module({
  providers: [
    EmailService,
    GmailEmailProvider,
  ],
  exports: [
    EmailService,
  ],
})
export class EmailModule {}
