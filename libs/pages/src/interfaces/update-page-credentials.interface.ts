import { IPage } from './page.interface';

export interface IUpdatePageCredentials {
  pageId: number;
  updateData: Partial<Omit<IPage, 'id'>>;
}
