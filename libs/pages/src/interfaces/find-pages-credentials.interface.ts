import { IPage } from './page.interface';

export type TFindPagesCredentials = Partial<IPage> & {
  pageNumbers?: number[];
  ids?: number[];
};
