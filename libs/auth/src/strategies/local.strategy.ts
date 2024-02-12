import { AuthHelperService, AuthService } from '../services';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LOCAL_STRATEGY } from '../constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LOCAL_STRATEGY) {
  constructor(private readonly authHelperService: AuthHelperService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authHelperService.validateUser(email, password);

    if (!user || !user?.['verified']) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
