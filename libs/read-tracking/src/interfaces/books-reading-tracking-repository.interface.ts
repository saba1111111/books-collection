import { TFindBookReadTrackingItemCredentials } from '../types';
import { TFindBooksReadTrackingItemsCredentials } from '../types/find-books-read-tracking-item-credentials.type';
import { IBooksReadTracking } from './books-reading-tracking.interface';
import { ICreateBookReadTrackingItemCredentials } from './create-book-read-tracking-item-credentials.interface';
import { ISaveBookReadTrackingItemCredentials } from './save-book-read-tracking-item-credentials.interface';

export interface IBooksReadingTrackingRepository {
  create(credentials: ICreateBookReadTrackingItemCredentials): IBooksReadTracking;
  save(credentials: ISaveBookReadTrackingItemCredentials): Promise<IBooksReadTracking>;
  findOne(credentials: TFindBookReadTrackingItemCredentials): Promise<IBooksReadTracking>;
  find(
    credentials: TFindBooksReadTrackingItemsCredentials,
  ): Promise<IBooksReadTracking[]>;
  //   updateById(credentials: IUpdateBooksReadTrackingItemCredentials): Promise<IBooksReadTrackingItem>;
  //   deleteById(credentials: IDeleteBooksReadTrackingItemCredentials): Promise<boolean>;
}
