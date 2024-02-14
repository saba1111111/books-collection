import { Inject, Injectable } from '@nestjs/common';
import { BOOKS_READ_TRACKING_REPOSITORY_TOKEN } from '../constants';
import { IBooksReadingTrackingRepository } from '../interfaces/books-reading-tracking-repository.interface';
import {
  CheckBookReadTrackingExistence,
  ISaveBookReadTrackingItemCredentials,
} from '../interfaces';
import { TFindBookReadTrackingItemCredentials } from '../types';

@Injectable()
export class BooksReadTrackingService {
  constructor(
    @Inject(BOOKS_READ_TRACKING_REPOSITORY_TOKEN)
    private readonly booksReadTrackingRepository: IBooksReadingTrackingRepository,
  ) {}

  public async checkBookReadTrackingItemExistence(
    credentials: CheckBookReadTrackingExistence,
  ) {
    const { bookId, userId } = credentials;
    const bookReadTrackingItem = await this.findBookReadTrackingItem({ bookId, userId });
    if (!bookReadTrackingItem) {
      return false;
    }

    return true;
  }

  public findBookReadTrackingItem(credentials: TFindBookReadTrackingItemCredentials) {
    return this.booksReadTrackingRepository.findOne(credentials);
  }

  public saveBooksReadTrackingItem(credentials: ISaveBookReadTrackingItemCredentials) {
    return this.booksReadTrackingRepository.save(credentials);
  }
}
