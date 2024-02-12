import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from 'libs/cache';
import { EnvironmentVariablesValidationService } from 'libs/common/services';
import { DatabaseModule } from 'libs/database';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
    }),
    DatabaseModule,
    CacheModule,
    AuthModule,
  ],
  controllers: [],
  providers: [EnvironmentVariablesValidationService],
})
export class AppModule {}
