import { TFindUserCredentials, TFindUsersCredentials } from '../types';
import { ICreateUserCredentials } from './create-user-credentials.interface';
import { IDeleteUserCredentials } from './delete-user-credentials.interface';
import { IUpdateUserCredentials } from './update-user-credentials.interface';
import { IUser } from './user.interface';

export interface IUsersRepository {
  create(credentials: ICreateUserCredentials): Promise<IUser>;
  findOne(credentials: TFindUserCredentials): Promise<IUser>;
  find(credentials: TFindUsersCredentials): Promise<IUser[]>;
  updateById(credentials: IUpdateUserCredentials): Promise<IUser>;
  deleteById(credentials: IDeleteUserCredentials): Promise<boolean>;
}
