import { RefreshTokens } from './refresh-tokens.interface';

export interface IUpdateRefreshTokenCredentials {
  refreshTokenId: number;
  updateData: Partial<RefreshTokens>;
}
