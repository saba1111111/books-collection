import { IBook } from './book.interface';

export interface IUpdateBookCredentials {
  bookId: number;
  updateData: Partial<Omit<IBook, 'id'>>;
}
