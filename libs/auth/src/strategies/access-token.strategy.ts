import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ACCESS_TOKEN_STRATEGY, TOKENS } from '../constants';
import { UsersService } from 'libs/users';
import { ENVS } from 'libs/common/constants';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  ACCESS_TOKEN_STRATEGY,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const token = request?.headers?.[TOKENS.ACCESS_TOKEN];

          if (!token) {
            return null;
          }

          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get(ENVS.ACCESS_TOKEN_SECRET),
    });
  }

  async validate(payload: any) {
    const { id } = payload;
    const user = await this.usersService.findUser({ id });

    if (!user) throw new UnauthorizedException('No such User!');
    if (!user.verified) throw new UnauthorizedException('User is UnVerified!');

    const { password, ...rest } = user;

    return rest;
  }
}
