import { IUser } from '../interfaces';

export type IUserSafe = Omit<IUser, 'password'>;
