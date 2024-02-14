import { Injectable } from '@nestjs/common';
import {
  IBook,
  IBooksRepository,
  ISaveBookCredentials,
  IDeleteBookCredentials,
  IUpdateBookCredentials,
  IUpdateFullBookCredentials,
} from '../interface';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { BooksEntity } from '../entitites';
import { Repository, DataSource } from 'typeorm';
import { TFindBookCredentials, TFindBooksRepositoryCredentials } from '../types';
import { TFindBooksResponse } from '../types/find-books-response.type';
import { ICreatePageCredentials } from 'libs/pages/interfaces';

@Injectable()
export class BooksTypeormRepository implements IBooksRepository {
  constructor(
    @InjectRepository(BooksEntity) private readonly repository: Repository<BooksEntity>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  public save(credentials: ISaveBookCredentials): Promise<IBook> {
    return this.repository.save(credentials);
  }

  public async findOne(credentials: TFindBookCredentials): Promise<IBook> {
    const options = { where: credentials, relations: ['pages'] };

    return this.repository.findOne(options);
  }

  public find(credentials: TFindBooksRepositoryCredentials): Promise<TFindBooksResponse> {
    const options = { where: credentials.Where, ...credentials.Pagination };

    return this.repository.findAndCount(options);
  }

  public async updateFullBook(credentials: IUpdateFullBookCredentials) {
    const { book, pages } = credentials;

    return this.dataSource.manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(book);

      if (pages.length) {
        await transactionalEntityManager.save(pages);
      }
    });
  }

  public async updateById(credentials: IUpdateBookCredentials): Promise<IBook> {
    const whereCondition = { id: credentials.bookId };
    const updatedData = credentials.updateData;

    await this.repository.update(whereCondition, updatedData);
    return this.findOne(whereCondition);
  }

  public async deleteById(credentials: IDeleteBookCredentials): Promise<boolean> {
    const whereCondition = credentials;

    const result = await this.repository.delete(whereCondition);
    return !!result.affected;
  }
}
