import { IUser } from 'libs/users/interfaces';

export interface ILoginCredentials {
  user: Omit<IUser, 'password'>;
  deviceId: string;
}
