import { AuthGuard } from '@nestjs/passport';
import { ACCESS_TOKEN_STRATEGY } from '../constants';

export class AccessTokenGuard extends AuthGuard(ACCESS_TOKEN_STRATEGY) {}
