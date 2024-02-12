import { Module } from '@nestjs/common';
import { AuthLibModule } from 'libs/auth';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy, LocalStrategy } from 'libs/auth/strategies';
import { UsersModule } from 'libs/users';

@Module({
  imports: [AuthLibModule, UsersModule],
  controllers: [AuthController],
  providers: [LocalStrategy, AccessTokenStrategy],
})
export class AuthModule {}
