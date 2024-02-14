import { Injectable } from '@nestjs/common';
import {
  ISavePageCredentials,
  IDeletePageCredentials,
  IPage,
  IPagesRepository,
  IUpdatePageCredentials,
  TFindPagesCredentials,
  ICreatePageCredentials,
} from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { PagesEntity } from '../entities';
import { In, Repository } from 'typeorm';
import { TFindPageCredentials } from '../types';

@Injectable()
export class PagesTypeormRepository implements IPagesRepository {
  constructor(
    @InjectRepository(PagesEntity) private readonly repository: Repository<PagesEntity>,
  ) {}

  public create(credentials: ICreatePageCredentials): IPage {
    const page = new PagesEntity();
    page.content = credentials.content;
    page.pageNumber = credentials.pageNumber;
    if (page.bookId) {
      page.bookId = credentials.bookId;
    }

    return page;
  }

  public save(credentials: ISavePageCredentials): Promise<IPage> {
    return this.repository.save(credentials);
  }

  public findOne(credentials: TFindPageCredentials): Promise<IPage> {
    const options = { where: credentials };
    return this.repository.findOne(options);
  }

  public find(credentials: TFindPagesCredentials): Promise<IPage[]> {
    const { pageNumbers, ids, ...whereConditionData } = credentials;
    const options = {
      where: {
        ...whereConditionData,
        ...(pageNumbers ? { pageNumber: In(pageNumbers) } : {}),
        ...(ids ? { id: In(ids) } : {}),
      },
    };

    return this.repository.find(options);
  }

  public async updateById(credentials: IUpdatePageCredentials): Promise<IPage> {
    const whereCondition = { id: credentials.pageId };
    const updatedData = credentials.updateData;

    await this.repository.update(whereCondition, updatedData);
    return this.findOne(whereCondition);
  }

  public async deleteById(credentials: IDeletePageCredentials): Promise<boolean> {
    const whereCondition = credentials;

    const result = await this.repository.delete(whereCondition);
    return !!result.affected;
  }
}
