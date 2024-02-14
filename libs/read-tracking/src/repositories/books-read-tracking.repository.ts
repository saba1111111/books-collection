import { Injectable } from '@nestjs/common';
import { IBooksReadingTrackingRepository } from '../interfaces/books-reading-tracking-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksReadTrackingEntity } from '../entities';
import { Repository } from 'typeorm';
import {
  IBooksReadTracking,
  ICreateBookReadTrackingItemCredentials,
  ISaveBookReadTrackingItemCredentials,
} from '../interfaces';
import {
  TFindBookReadTrackingItemCredentials,
  TFindBooksReadTrackingItemsCredentials,
} from '../types';

@Injectable()
export class BooksReadTrackingTypeormRepository
  implements IBooksReadingTrackingRepository
{
  constructor(
    @InjectRepository(BooksReadTrackingEntity)
    private readonly repository: Repository<BooksReadTrackingEntity>,
  ) {}

  public create(credentials: ICreateBookReadTrackingItemCredentials): IBooksReadTracking {
    const booksReadTrackingItem = new BooksReadTrackingEntity();
    booksReadTrackingItem.bookId = credentials.bookId;
    booksReadTrackingItem.userId = credentials.userId;
    booksReadTrackingItem.startReadAt = credentials.startReadAt;

    return booksReadTrackingItem;
  }

  public save(
    credentials: ISaveBookReadTrackingItemCredentials,
  ): Promise<IBooksReadTracking> {
    return this.repository.save(credentials);
  }

  public findOne(
    credentials: TFindBookReadTrackingItemCredentials,
  ): Promise<IBooksReadTracking> {
    const options = { where: credentials };
    return this.repository.findOne(options);
  }

  public find(
    credentials: TFindBooksReadTrackingItemsCredentials,
  ): Promise<IBooksReadTracking[]> {
    const options = { where: credentials };
    return this.repository.find(options);
  }
}
