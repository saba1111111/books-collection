import { IUser } from './user.interface';

export interface IUpdateUserCredentials {
  userId: number;
  updateData: Partial<Omit<IUser, 'id'>>;
}
