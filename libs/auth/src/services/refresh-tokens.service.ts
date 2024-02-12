import { Inject, Injectable } from '@nestjs/common';
import { REFRESH_TOKENS_REPOSITORY } from '../constants';
import {
  ICreateRefreshTokensCredentials,
  IRefreshTokenRepository,
  IUpdateRefreshTokenCredentials,
} from '../interfaces';
import {
  TDeleteRefreshTokenCredentials,
  TFindRefreshTokenCredentials,
  TFindRefreshTokensCredentials,
} from '../types';

@Injectable()
export class RefreshTokensService {
  constructor(
    @Inject(REFRESH_TOKENS_REPOSITORY)
    private readonly refreshTokensRepository: IRefreshTokenRepository,
  ) {}

  public createRefreshToken(credentials: ICreateRefreshTokensCredentials) {
    return this.refreshTokensRepository.create(credentials);
  }

  public findRefreshToken(credentials: TFindRefreshTokenCredentials) {
    return this.refreshTokensRepository.findOne(credentials);
  }

  public findRefreshTokens(credentials: TFindRefreshTokensCredentials) {
    return this.refreshTokensRepository.find(credentials);
  }

  public deleteRefreshToken(credentials: TDeleteRefreshTokenCredentials) {
    return this.refreshTokensRepository.delete(credentials);
  }

  public updateRefreshToken(credentials: IUpdateRefreshTokenCredentials) {
    return this.refreshTokensRepository.updateById(credentials);
  }
}
