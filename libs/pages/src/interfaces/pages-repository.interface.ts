import { TFindPageCredentials } from '../types';
import { ISavePageCredentials } from './save-page-credentials.interface';
import { IDeletePageCredentials } from './delete-page-credentials.interface';
import { TFindPagesCredentials } from './find-pages-credentials.interface';
import { IPage } from './page.interface';
import { IUpdatePageCredentials } from './update-page-credentials.interface';
import { ICreatePageCredentials } from './create-page-credentials.interface';

export interface IPagesRepository {
  create(credentials: ICreatePageCredentials): IPage;
  save(credentials: ISavePageCredentials): Promise<IPage>;
  findOne(credentials: TFindPageCredentials): Promise<IPage>;
  find(credentials: TFindPagesCredentials): Promise<IPage[]>;
  updateById(credentials: IUpdatePageCredentials): Promise<IPage>;
  deleteById(credentials: IDeletePageCredentials): Promise<boolean>;
}
