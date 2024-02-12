import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UtilsModule } from 'libs/utils';
import { UsersModule } from 'libs/users';
import { CacheModule } from 'libs/cache';
import { MailModule } from 'libs/mail';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokensEntity } from './entities';
import { RefreshTokensDatabaseProviders } from './providers';
import { AuthHelperService, RefreshTokensService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokensEntity]),
    UtilsModule,
    UsersModule,
    CacheModule,
    MailModule,
  ],
  providers: [
    AuthService,
    AuthHelperService,
    ...RefreshTokensDatabaseProviders,
    RefreshTokensService,
  ],
  exports: [AuthService, AuthHelperService],
})
export class AuthLibModule {}
