import { IJwtConfig } from './jwt-config.interface';

export interface ITokenService {
  signToken(payload: object, config?: IJwtConfig): Promise<string>;
}
