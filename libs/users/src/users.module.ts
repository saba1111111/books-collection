import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDatabaseProviders } from './providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entitites';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [UsersService, ...UsersDatabaseProviders],
  exports: [UsersService],
})
export class UsersModule {}
