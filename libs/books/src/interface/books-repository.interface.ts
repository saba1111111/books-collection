import { TFindBookCredentials, TFindBooksRepositoryCredentials } from '../types';
import { IBook } from './book.interface';
import { ISaveBookCredentials } from './save-book-credentials.interface';
import { IDeleteBookCredentials } from './delete-book-credentials.interface';
import { IUpdateBookCredentials } from './update-book-credentials.interface';
import { TFindBooksResponse } from '../types/find-books-response.type';
import { ICreatePageCredentials } from 'libs/pages/interfaces';
import { IUpdateFullBookCredentials } from './update-full-book-credentials.interface';

export interface IBooksRepository {
  save(credentials: ISaveBookCredentials): Promise<IBook>;
  updateFullBook(credentials: IUpdateFullBookCredentials): Promise<unknown>;
  findOne(credentials: TFindBookCredentials): Promise<IBook>;
  find(credentials: TFindBooksRepositoryCredentials): Promise<TFindBooksResponse>;
  updateById(credentials: IUpdateBookCredentials): Promise<IBook>;
  deleteById(credentials: IDeleteBookCredentials): Promise<boolean>;
}
