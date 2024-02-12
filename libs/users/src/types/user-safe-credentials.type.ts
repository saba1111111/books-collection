import { IUser } from '../interfaces';

export type TUserSafe = Omit<IUser, 'password'>;
