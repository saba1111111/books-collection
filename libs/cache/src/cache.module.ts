import { Module } from '@nestjs/common';
import { CacheModuleProviders } from './providers';
import { MailModule } from 'libs/mail';

@Module({
  imports: [MailModule],
  providers: [...CacheModuleProviders],
  exports: [...CacheModuleProviders],
})
export class CacheModule {}
