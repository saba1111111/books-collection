import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'libs/users';
import { HASH_SERVICE_TOKEN } from 'libs/utils/constants';
import { IHashService } from 'libs/utils/interfaces';
import {
  IChangePasswordCredentials,
  ILoginCredentials,
  IRegisterUserCredentials,
  IVerifyUserCredentials,
} from '../interfaces';
import { AuthHelperService } from './auth-helper.service';
import { Request, Response } from 'express';
import { RefreshTokensService } from './refresh-tokens.service';
import { TOKENS } from '../constants';
import { IUserSafe } from 'libs/users/types';

@Injectable()
export class AuthService {
  constructor(
    @Inject(HASH_SERVICE_TOKEN) private readonly hashService: IHashService,
    private readonly userService: UsersService,
    private readonly authHelperService: AuthHelperService,
    private readonly refreshTokensService: RefreshTokensService,
  ) {}

  public async register(credentials: IRegisterUserCredentials) {
    const { email, password, name } = credentials;
    try {
      await this.userService.isEmailAvailable(email);

      const hashedPassword = await this.hashService.hash(password);
      await this.userService.createUser({ email, password: hashedPassword, name });

      await this.authHelperService.sendAndSaveOtp({ email });

      return { message: 'Successfully registered!', email: email };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async verifyUser(credentials: IVerifyUserCredentials) {
    try {
      const { email } = credentials;

      await this.authHelperService.checkOtpValidity(credentials);

      const user = await this.userService.findUser({ email });
      if (!user) {
        throw new NotFoundException(`User with this email: ${email} not found!`);
      }

      await this.userService.updateUser({
        userId: user.id,
        updateData: { verified: true },
      });

      return { message: 'Successfully verified!' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async login(credentials: ILoginCredentials, res: Response) {
    try {
      const { deviceId, user } = credentials;

      const payload = { userId: user.id, email: user.email };
      const accessToken = await this.authHelperService.generateAccessToken({ payload });
      const refreshTokenData = await this.authHelperService.setRefreshToken(
        { payload },
        res,
      );

      await this.refreshTokensService.createRefreshToken({
        expireDate: refreshTokenData.expireDate.getTime(),
        deviceId,
        token: refreshTokenData.refreshToken,
        userId: user.id,
      });

      return res.send({
        success: true,
        message: 'successfully login!',
        data: { user, accessToken },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async refreshToken(req: Request) {
    try {
      const refreshToken = this.authHelperService.extractRefreshTokenFromRequest(req);
      if (!refreshToken) {
        throw new Error('Failed extracting refresh token from cookies!');
      }

      const refreshTokenData = await this.refreshTokensService.findRefreshToken({
        token: refreshToken,
      });
      if (!refreshTokenData) {
        throw new Error('Invalid Refresh token!');
      }

      if (refreshTokenData.expireDate < Date.now()) {
        await this.refreshTokensService.deleteRefreshToken({ id: refreshTokenData.id });
        throw new Error('Refresh Token Expire.');
      }

      const user = await this.userService.findUser({ id: refreshTokenData.userId });
      if (!user) {
        throw new Error('Cannot find user associated with the token!');
      }

      const payload = { email: user.email, userId: user.id };
      const accessToken = await this.authHelperService.generateAccessToken({ payload });

      return { message: 'Token refreshed successfully.', accessToken };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async logout(req: Request, res: Response) {
    try {
      const refreshToken = this.authHelperService.extractRefreshTokenFromRequest(req);

      if (refreshToken) {
        const refreshTokenData = await this.refreshTokensService.findRefreshToken({
          token: refreshToken,
        });

        if (refreshTokenData) {
          res.clearCookie(TOKENS.REFRESH_TOKEN);
          await this.refreshTokensService.deleteRefreshToken({ id: refreshTokenData.id });
        }
      }

      return res.send({ message: 'Logged out successfully.' });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async changePassword(credentials: IChangePasswordCredentials, user: IUserSafe) {
    try {
      const { newPassword, oldPassword } = credentials;

      const UserFullData = await this.userService.findUser({ id: user.id });

      const comparePasswords = await this.hashService.compare(
        oldPassword,
        UserFullData.password,
      );
      if (!comparePasswords) {
        throw new ConflictException('Passwords does not match!');
      }

      const hashedPassword = await this.hashService.hash(newPassword);
      await this.userService.updateUser({
        userId: user.id,
        updateData: { password: hashedPassword },
      });

      await this.refreshTokensService.deleteRefreshToken({ userId: user.id });

      return { success: true, message: 'Successfully update password!' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
