import {
  BOOKS_READ_TRACKING_REPOSITORY_TOKEN,
  PAGES_READ_TRACKING_REPOSITORY_TOKEN,
} from '../constants';
import {
  BooksReadTrackingTypeormRepository,
  PagesReadTrackingTypeormRepository,
} from '../repositories';

export const ReadTrackingModuleDatabaseProviders = [
  {
    provide: BOOKS_READ_TRACKING_REPOSITORY_TOKEN,
    useClass: BooksReadTrackingTypeormRepository,
  },
  {
    provide: PAGES_READ_TRACKING_REPOSITORY_TOKEN,
    useClass: PagesReadTrackingTypeormRepository,
  },
];
