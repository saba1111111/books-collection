import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagesReadingTrackingEntity } from '../entities';
import { Repository } from 'typeorm';
import {
  ICreatePageReadTrackingCredentials,
  IFindLastPageReadTrackingCredentials,
  IPagesReadingTracking,
} from '../interfaces';
import {
  FindPagesReadTrackingItemCredentials,
  TFindPageReadTrackingItemCredentials,
} from '../types';
import { IPagesReadingTrackingRepository } from '../interfaces/pages-reading-tracking-repository.interface ';
import { ISavePageReadTrackingCredentials } from '../interfaces/save-page-read-tracking-credentials';

@Injectable()
export class PagesReadTrackingTypeormRepository
  implements IPagesReadingTrackingRepository
{
  constructor(
    @InjectRepository(PagesReadingTrackingEntity)
    private readonly repository: Repository<PagesReadingTrackingEntity>,
  ) {}

  public create(credentials: ICreatePageReadTrackingCredentials): IPagesReadingTracking {
    const pagesReadTrackingItem = new PagesReadingTrackingEntity();
    pagesReadTrackingItem.booksReadTrackingId = credentials.booksReadTrackingId;
    pagesReadTrackingItem.pageId = credentials.pageId;
    pagesReadTrackingItem.startReadAt = credentials.startReadAt;

    return pagesReadTrackingItem;
  }

  public save(
    credentials: ISavePageReadTrackingCredentials,
  ): Promise<IPagesReadingTracking> {
    return this.repository.save(credentials);
  }

  public findLastPageReadTrackingItem(credentials: IFindLastPageReadTrackingCredentials) {
    const { bookReadTrackingId } = credentials;

    return this.repository
      .createQueryBuilder()
      .where('books_read_tracking_id = :bookReadTrackingId', { bookReadTrackingId })
      .orderBy('start_read_date', 'DESC')
      .getOne();
  }

  public findOne(
    credentials: TFindPageReadTrackingItemCredentials,
  ): Promise<IPagesReadingTracking> {
    const options = { where: credentials };
    return this.repository.findOne(options);
  }

  public find(
    credentials: FindPagesReadTrackingItemCredentials,
  ): Promise<IPagesReadingTracking[]> {
    const options = { where: credentials };
    return this.repository.find(options);
  }
}
