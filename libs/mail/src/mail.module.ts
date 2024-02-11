import { Module } from '@nestjs/common';
import { MailService } from './services';

@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
