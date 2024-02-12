import { Injectable } from '@nestjs/common';
import {
  ICreateUserCredentials,
  IDeleteUserCredentials,
  IUpdateUserCredentials,
  IUser,
  IUsersRepository,
} from '../interfaces';
import { Repository } from 'typeorm';
import { UsersEntity } from '../entitites';
import { TFindUserCredentials, TFindUsersCredentials } from '../types';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersTypeormRepository implements IUsersRepository {
  constructor(
    @InjectRepository(UsersEntity) private readonly repository: Repository<UsersEntity>,
  ) {}

  public create(credentials: ICreateUserCredentials): Promise<IUser> {
    return this.repository.save(credentials);
  }

  public findOne(credentials: TFindUserCredentials): Promise<IUser> {
    const options = { where: credentials };
    return this.repository.findOne(options);
  }

  public find(credentials: TFindUsersCredentials): Promise<IUser[]> {
    const options = { where: credentials };
    return this.repository.find(options);
  }

  public async updateById(credentials: IUpdateUserCredentials): Promise<IUser> {
    const whereCondition = { id: credentials.userId };
    const updatedData = credentials.updateData;

    await this.repository.update(whereCondition, updatedData);
    return this.findOne(whereCondition);
  }

  public async deleteById(credentials: IDeleteUserCredentials): Promise<boolean> {
    const whereCondition = credentials;

    const result = await this.repository.delete(whereCondition);
    return !!result.affected;
  }
}
