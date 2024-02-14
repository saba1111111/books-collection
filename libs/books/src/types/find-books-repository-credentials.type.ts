import { IBook } from '../interface';

export type TFindBooksRepositoryCredentials = {
  Where: Partial<IBook>;
  Pagination: {
    skip?: number;
    take?: number;
  };
};
