import {
  TDeleteRefreshTokenCredentials,
  TFindRefreshTokenCredentials,
  TFindRefreshTokensCredentials,
} from '../types';
import { ICreateRefreshTokensCredentials } from './create-refresh-tokens-credentials';
import { RefreshTokens } from './refresh-tokens.interface';
import { IUpdateRefreshTokenCredentials } from './update-refresh-token-credentials';

export interface IRefreshTokenRepository {
  create(credentials: ICreateRefreshTokensCredentials): Promise<RefreshTokens>;
  findOne(credentials: TFindRefreshTokenCredentials): Promise<RefreshTokens>;
  find(credentials: TFindRefreshTokensCredentials): Promise<RefreshTokens[]>;
  updateById(credentials: IUpdateRefreshTokenCredentials): Promise<RefreshTokens>;
  delete(credentials: TDeleteRefreshTokenCredentials): Promise<boolean>;
}
