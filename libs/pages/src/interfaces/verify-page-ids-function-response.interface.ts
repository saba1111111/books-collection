import { IPage } from './page.interface';

export interface VerifyPageIdsFunctionResponse {
  validPages: IPage[];
  invalidIPageIds: number[];
}
