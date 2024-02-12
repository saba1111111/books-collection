import { Body, Controller, Injectable, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
  public register(@Body() credentials: RegisterUserDto) {
    return this.authService.register(credentials);
  }

  @Post(AuthRoutes.VERIFY_ACCOUNT)
  public verifyUser(@Body() credentials: IVerifyUserCredentialsDto) {
    return this.authService.verifyUser(credentials);
  }

  @Post(AuthRoutes.LOGIN)
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
  public async RefreshToken(@Req() request: Request) {
    return this.authService.refreshToken(request);
  }

  @Post(AuthRoutes.LOGOUT)
  public async logout(@Req() request: Request, @Res() response: Response) {
    return this.authService.logout(request, response);
  }

  @Post(AuthRoutes.CHANGE_PASSWORD)
  @UseGuards(guards.AccessTokenGuard)
  public async changePassword(
    @Body() credentials: ChangePasswordCredentialsDto,
    @Req() request: CustomRequest,
  ) {
    return this.authService.changePassword(credentials, request.user);
  }
}
