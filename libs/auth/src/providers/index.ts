import { REFRESH_TOKENS_REPOSITORY } from '../constants';
import { RefreshTokensTypeormRepository } from '../repositories';

export const RefreshTokensDatabaseProviders = [
  {
    provide: REFRESH_TOKENS_REPOSITORY,
    useClass: RefreshTokensTypeormRepository,
  },
];
