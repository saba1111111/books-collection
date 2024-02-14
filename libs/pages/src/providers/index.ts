import { PAGES_REPOSITORY_TOKEN } from '../constants';
import { PagesTypeormRepository } from '../repositories';

export const ModulePagesProviders = [
  {
    provide: PAGES_REPOSITORY_TOKEN,
    useClass: PagesTypeormRepository,
  },
];
