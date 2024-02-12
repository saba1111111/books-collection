import { Injectable } from '@nestjs/common';
import { JwtService as JWT } from '@nestjs/jwt';
import { IJwtConfig, ITokenService } from '../interfaces';

@Injectable()
export class JwtService implements ITokenService {
  public constructor(private readonly jwtService: JWT) {}

  public signToken(payload: object, config?: IJwtConfig): Promise<string> {
    return this.jwtService.signAsync(payload, config);
  }
}
