import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from 'libs/cache';
import { EnvironmentVariablesValidationService } from 'libs/common/services';
import { DatabaseModule } from 'libs/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    CacheModule,
  ],
  controllers: [],
  providers: [EnvironmentVariablesValidationService],
})
export class AppModule {}
