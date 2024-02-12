import { BOOKS_REPOSITORY_TOKEN } from '../constants';
import { BooksTypeormRepository } from '../repositories';

export const BooksModuleProviders = [
  {
    provide: BOOKS_REPOSITORY_TOKEN,
    useClass: BooksTypeormRepository,
  },
];
