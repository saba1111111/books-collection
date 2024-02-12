import { IUser } from '../interfaces';

export type TFindUsersCredentials = Partial<Omit<IUser, 'password'>>;
