import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENVS } from 'libs/common/constants';
import { IDatabaseCredentials } from './interfaces';
import { UsersEntity } from 'libs/users/entitites';
import { RefreshTokensEntity } from 'libs/auth/entities';
import { BooksEntity } from 'libs/books/entitites';
import { PagesEntity } from 'libs/pages/entities/pages.entity';
import {
  BooksReadTrackingEntity,
  PagesReadingTrackingEntity,
} from 'libs/read-tracking/entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseCredentials = {
          type: configService.get(ENVS.DATABASE_TYPE),
          host: configService.get(ENVS.POSTGRES_HOST),
          port: configService.get(ENVS.POSTGRES_PORT),
          username: configService.get(ENVS.POSTGRES_USER),
          password: configService.get(ENVS.POSTGRES_PASSWORD),
          database: configService.get(ENVS.POSTGRES_DB),
          entities: [
            UsersEntity,
            RefreshTokensEntity,
            BooksEntity,
            PagesEntity,
            PagesReadingTrackingEntity,
            BooksReadTrackingEntity,
          ],
          synchronize: true,
        };

        return databaseCredentials;
      },
    }),
  ],
})
export class DatabaseModule {}
