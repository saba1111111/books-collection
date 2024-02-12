import { Inject, Injectable } from '@nestjs/common';
import { BOOKS_REPOSITORY_TOKEN } from './constants';
import {
  IBooksRepository,
  ICreateBookCredentials,
  IDeleteBookCredentials,
  IUpdateBookCredentials,
} from './interface';
import { TFindBookCredentials, TFindBooksCredentials } from './types';

@Injectable()
export class BooksService {
  constructor(
    @Inject(BOOKS_REPOSITORY_TOKEN) private readonly booksRepository: IBooksRepository,
  ) {}

  public createBook(credentials: ICreateBookCredentials) {
    return this.booksRepository.create(credentials);
  }

  public findBook(credentials: TFindBookCredentials) {
    return this.booksRepository.findOne(credentials);
  }

  public findBooks(credentials: TFindBooksCredentials) {
    return this.booksRepository.find(credentials);
  }

  public deleteBook(credentials: IDeleteBookCredentials) {
    return this.booksRepository.deleteById(credentials);
  }

  public updateBook(credentials: IUpdateBookCredentials) {
    return this.booksRepository.updateById(credentials);
  }
}
