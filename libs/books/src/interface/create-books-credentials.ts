import { ICreatePageCredentials } from 'libs/pages/interfaces';

export interface ICreateBookCredentials {
  pages: ICreatePageCredentials[];
  description: string;
  title: string;
}
