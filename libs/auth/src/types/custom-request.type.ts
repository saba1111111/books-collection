import { Request } from 'express';
import { IUser } from 'libs/users/interfaces';

export type CustomRequest = Request & { user: Omit<IUser, 'password'> };
