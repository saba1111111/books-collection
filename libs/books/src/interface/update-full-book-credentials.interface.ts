import { ICreatePageCredentials } from 'libs/pages/interfaces';

export interface IUpdateFullBookCredentials {
  book: { description: string; title: string; authorId: number };
  pages: ICreatePageCredentials[];
}
