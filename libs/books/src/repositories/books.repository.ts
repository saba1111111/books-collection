import { Injectable } from '@nestjs/common';
import {
  IBook,
  IBooksRepository,
  ICreateBookCredentials,
  IDeleteBookCredentials,
  IUpdateBookCredentials,
} from '../interface';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksEntity } from '../entitites';
import { Repository } from 'typeorm';
import { TFindBookCredentials, TFindBooksCredentials } from '../types';

@Injectable()
export class BooksTypeormRepository implements IBooksRepository {
  constructor(
    @InjectRepository(BooksEntity) private readonly repository: Repository<BooksEntity>,
  ) {}

  public create(credentials: ICreateBookCredentials): Promise<IBook> {
    return this.repository.save(credentials);
  }

  public findOne(credentials: TFindBookCredentials): Promise<IBook> {
    const options = { where: credentials };
    return this.repository.findOne(options);
  }

  public find(credentials: TFindBooksCredentials): Promise<IBook[]> {
    const options = { where: credentials };
    return this.repository.find(options);
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
