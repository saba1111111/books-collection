import {
  Body,
  Controller,
  HttpCode,
  Injectable,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Request, Response } from 'express';
import { AuthService } from 'libs/auth';
import { AuthRoutes } from 'libs/auth/constants';
import {
  ChangePasswordCredentialsDto,
  IVerifyUserCredentialsDto,
  LoginCredentialsDto,
  RegisterUserDto,
} from 'libs/auth/dtos';
import * as guards from 'libs/auth/guards';
import { CustomRequest } from 'libs/auth/types';

@Controller(AuthRoutes.CONTROLLER)
@ApiTags(AuthRoutes.CONTROLLER)
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AuthRoutes.REGISTER)
  @Throttle({ default: { limit: 20, ttl: 60 } })
  @HttpCode(201)
  public register(@Body() credentials: RegisterUserDto) {
    return this.authService.register(credentials);
  }

  @Post(AuthRoutes.VERIFY_ACCOUNT)
  @Throttle({ default: { limit: 20, ttl: 60 } })
  @HttpCode(200)
  public verifyUser(@Body() credentials: IVerifyUserCredentialsDto) {
    return this.authService.verifyUser(credentials);
  }

  @Post(AuthRoutes.LOGIN)
  @Throttle({ default: { limit: 20, ttl: 60 } })
  @HttpCode(200)
  @UseGuards(guards.LocalAuthGuard)
  public login(
    @Body() credentials: LoginCredentialsDto,
    @Req() request: CustomRequest,
    @Res() response: Response,
  ) {
    return this.authService.login(
      { deviceId: credentials.deviceId, user: request.user },
      response,
    );
  }

  @Post(AuthRoutes.REFRESH_TOKEN)
  @Throttle({ default: { limit: 20, ttl: 60 } })
  @HttpCode(200)
  public async RefreshToken(@Req() request: Request) {
    return this.authService.refreshToken(request);
  }

  @Post(AuthRoutes.LOGOUT)
  @Throttle({ default: { limit: 20, ttl: 60 } })
  @HttpCode(200)
  public async logout(@Req() request: Request, @Res() response: Response) {
    return this.authService.logout(request, response);
  }

  @Post(AuthRoutes.CHANGE_PASSWORD)
  @Throttle({ default: { limit: 20, ttl: 60 } })
  @HttpCode(200)
  @UseGuards(guards.AccessTokenGuard)
  public async changePassword(
    @Body() credentials: ChangePasswordCredentialsDto,
    @Req() request: CustomRequest,
  ) {
    return this.authService.changePassword(credentials, request.user);
  }
}
