import { Injectable } from '@nestjs/common';
import {
  ICreateRefreshTokensCredentials,
  IRefreshTokenRepository,
  IUpdateRefreshTokenCredentials,
  RefreshTokens,
} from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokensEntity } from '../entities';
import { Repository } from 'typeorm';
import {
  TDeleteRefreshTokenCredentials,
  TFindRefreshTokenCredentials,
  TFindRefreshTokensCredentials,
} from '../types';

@Injectable()
export class RefreshTokensTypeormRepository implements IRefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshTokensEntity)
    private readonly repository: Repository<RefreshTokensEntity>,
  ) {}

  public create(credentials: ICreateRefreshTokensCredentials): Promise<RefreshTokens> {
    return this.repository.save(credentials);
  }

  public findOne(credentials: TFindRefreshTokenCredentials): Promise<RefreshTokens> {
    const options = { where: credentials };
    return this.repository.findOne(options);
  }

  public find(credentials: TFindRefreshTokensCredentials): Promise<RefreshTokens[]> {
    const options = { where: credentials };
    return this.repository.find(options);
  }

  public async updateById(
    credentials: IUpdateRefreshTokenCredentials,
  ): Promise<RefreshTokens> {
    const whereCondition = { id: credentials.refreshTokenId };
    const updatedData = credentials.updateData;

    await this.repository.update(whereCondition, updatedData);
    return this.findOne(whereCondition);
  }

  public async delete(credentials: TDeleteRefreshTokenCredentials): Promise<boolean> {
    const whereCondition = credentials;

    const result = await this.repository.delete(whereCondition);
    return !!result.affected;
  }
}
