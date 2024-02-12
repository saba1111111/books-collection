import { USERS_REPOSITORY_TOKEN } from '../constants';
import { UsersTypeormRepository } from '../repositories';

export const UsersDatabaseProviders = [
  {
    provide: USERS_REPOSITORY_TOKEN,
    useClass: UsersTypeormRepository,
  },
];
