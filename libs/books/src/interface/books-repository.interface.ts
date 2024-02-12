import { TFindBookCredentials, TFindBooksCredentials } from '../types';
import { IBook } from './book.interface';
import { ICreateBookCredentials } from './create-book-credentials.interface';
import { IDeleteBookCredentials } from './delete-book-credentials.interface';
import { IUpdateBookCredentials } from './update-book-credentials.interface';

export interface IBooksRepository {
  create(credentials: ICreateBookCredentials): Promise<IBook>;
  findOne(credentials: TFindBookCredentials): Promise<IBook>;
  find(credentials: TFindBooksCredentials): Promise<IBook[]>;
  updateById(credentials: IUpdateBookCredentials): Promise<IBook>;
  deleteById(credentials: IDeleteBookCredentials): Promise<boolean>;
}
