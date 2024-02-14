import { ICreatePageCredentials } from 'libs/pages/interfaces';

export interface ISaveBookCredentials {
  description: string;
  title: string;
  authorId: number;
  pages?: ICreatePageCredentials[];
}
