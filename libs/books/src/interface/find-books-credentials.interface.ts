import { PaginationCredentials } from 'libs/common/interfaces';

export interface IFindBooksCredentials extends PaginationCredentials {
  authorId?: number;
}
