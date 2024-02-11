import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENVS } from 'libs/common/constants';
import { IDatabaseCredentials } from './interfaces';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseCredentials: IDatabaseCredentials = {
          type: configService.get(ENVS.DATABASE_TYPE),
          host: configService.get(ENVS.POSTGRES_HOST),
          port: configService.get(ENVS.POSTGRES_PORT),
          username: configService.get(ENVS.POSTGRES_USER),
          password: configService.get(ENVS.POSTGRES_PASSWORD),
          database: configService.get(ENVS.POSTGRES_DB),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        };

        return databaseCredentials;
      },
    }),
  ],
})
export class DatabaseModule {}
