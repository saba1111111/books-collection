import { ConflictException, Inject, Injectable } from '@nestjs/common';
import {
  ICheckOtpValidityCredentials,
  IGenerateTokenCredentials,
  ISendAndSaveOtpCredentials,
} from '../interfaces';
import {
  GENERATOR_SERVICE_TOKEN,
  HASH_SERVICE_TOKEN,
  TOKENS_SERVICE_TOKEN,
} from 'libs/utils/constants';
import { IGeneratorService, IHashService, ITokenService } from 'libs/utils/interfaces';
import { CACHE_SERVICE_TOKEN } from 'libs/cache/constants';
import { ICacheService } from 'libs/cache/interfaces';
import { MailService } from 'libs/mail/services';
import { ConfigService } from '@nestjs/config';
import { ENVS } from 'libs/common/constants';
import { Response } from 'express';
import { DateFormats, TOKENS } from '../constants';
import { IGetExpireDateCredentials } from '../interfaces/get-expire-date-credentials.interface';
import { UsersService } from 'libs/users';
import { IUser } from 'libs/users/interfaces';
import { Request } from 'express';

@Injectable()
export class AuthHelperService {
  constructor(
    @Inject(GENERATOR_SERVICE_TOKEN)
    private readonly generatorService: IGeneratorService,
    @Inject(CACHE_SERVICE_TOKEN)
    private readonly cacheService: ICacheService,
    private readonly mailService: MailService,
    @Inject(TOKENS_SERVICE_TOKEN)
    private readonly tokensService: ITokenService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    @Inject(HASH_SERVICE_TOKEN) private readonly hashService: IHashService,
  ) {}

  public async sendAndSaveOtp(credentials: ISendAndSaveOtpCredentials) {
    const { email } = credentials;
    const OTP = this.generatorService.generateCode(6);

    await this.cacheService.add(email, OTP, 300); // 5 minutes

    return this.mailService
      .sendMessage()
      .to(email)
      .subject('The OTP is valid for five minutes.')
      .text(`OTP = ${OTP}`)
      .built();
  }

  public async checkOtpValidity(credentials: ICheckOtpValidityCredentials) {
    const { code, email } = credentials;

    const OTP = await this.cacheService.get<number>(email);
    if (OTP == null || Number(OTP) !== code) {
      throw new ConflictException('Verification failed, Wrong credentials!');
    }

    return this.cacheService.remove(email);
  }

  public async generateAccessToken(credentials: IGenerateTokenCredentials) {
    const expiresInSeconds = this.configService.get(ENVS.ACCESS_TOKEN_EXPIRATION_TIME);
    const secret = this.configService.get(ENVS.ACCESS_TOKEN_SECRET);

    return this.tokensService.signToken(credentials.payload, {
      expiresIn: expiresInSeconds,
      secret,
    });
  }

  public async generateRefreshToken(credentials: IGenerateTokenCredentials) {
    const expiresInSeconds = this.configService.get(ENVS.REFRESH_TOKEN_EXPIRATION_TIME);
    const secret = this.configService.get(ENVS.REFRESH_TOKEN_SECRET);

    return this.tokensService.signToken(credentials.payload, {
      expiresIn: expiresInSeconds,
      secret,
    });
  }

  public async setRefreshToken(credentials: IGenerateTokenCredentials, res: Response) {
    const expiresInSeconds = this.configService.get(ENVS.REFRESH_TOKEN_EXPIRATION_TIME);
    const refreshToken = await this.generateRefreshToken(credentials);

    const expireDate = this.getExpireDate({
      expirationTimeString: expiresInSeconds,
      format: DateFormats.object,
    }) as Date;

    res.cookie(TOKENS.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      expires: expireDate,
    });

    return { refreshToken, expireDate };
  }

  private getExpireDate(credentials: IGetExpireDateCredentials) {
    const { expirationTimeString, format } = credentials;

    const expirationTimeInSeconds = Number(
      expirationTimeString.endsWith('s')
        ? expirationTimeString.slice(0, -1)
        : expirationTimeString,
    );

    const expirationDate = new Date(expirationTimeInSeconds * 1000 + Date.now());

    if (format === DateFormats.milliseconds) {
      return expirationDate.getTime();
    } else {
      return expirationDate;
    }
  }

  public async validateUser(
    email: string,
    pass: string,
  ): Promise<boolean | Omit<IUser, 'password'>> {
    const user = await this.usersService.findUser({ email });
    if (user) {
      const comparePasswords = await this.hashService.compare(pass, user.password);

      if (comparePasswords) {
        const { password, ...result } = user;
        return result;
      }
    }

    return false;
  }

  public extractRefreshTokenFromRequest(request: Request) {
    const cookies = request.headers?.cookie;
    if (!cookies) {
      return null;
    }

    const refreshTokenMatch = cookies.match(/refreshToken=([^;]+)/);
    const refreshTokenValue = refreshTokenMatch ? refreshTokenMatch[1] : null;
    if (!refreshTokenValue) {
      return null;
    }

    return refreshTokenValue;
  }
}
