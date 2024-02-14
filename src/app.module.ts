import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from 'libs/cache';
import { EnvironmentVariablesValidationService } from 'libs/common/services';
import { DatabaseModule } from 'libs/database';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { BooksModule } from './books/books.module';
import { ReadTrackingModule } from './read-tracking/read-tracking.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 100,
      },
    ]),
    DatabaseModule,
    CacheModule,
    AuthModule,
    BooksModule,
    ReadTrackingModule,
  ],
  controllers: [],
  providers: [
    EnvironmentVariablesValidationService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
