import {
  FindPagesReadTrackingItemCredentials,
  TFindPageReadTrackingItemCredentials,
} from '../types';
import { ICreatePageReadTrackingCredentials } from './create-page-read-tracking-credentials';
import { IFindLastPageReadTrackingCredentials } from './find-last-page-read-tracking-credentials';
import { IPagesReadingTracking } from './pages-reading-tracking.interface';
import { ISavePageReadTrackingCredentials } from './save-page-read-tracking-credentials';

export interface IPagesReadingTrackingRepository {
  create(credentials: ICreatePageReadTrackingCredentials): IPagesReadingTracking;
  save(credentials: ISavePageReadTrackingCredentials): Promise<IPagesReadingTracking>;
  findOne(
    credentials: TFindPageReadTrackingItemCredentials,
  ): Promise<IPagesReadingTracking>;
  find(
    credentials: FindPagesReadTrackingItemCredentials,
  ): Promise<IPagesReadingTracking[]>;
  findLastPageReadTrackingItem(
    credentials: IFindLastPageReadTrackingCredentials,
  ): Promise<IPagesReadingTracking>;
  //   updateById(credentials: IUpdateBooksReadTrackingItemCredentials): Promise<IBooksReadTrackingItem>;
  //   deleteById(credentials: IDeleteBooksReadTrackingItemCredentials): Promise<boolean>;
}
