import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY_TOKEN } from './constants';
import {
  ICreateUserCredentials,
  IDeleteUserCredentials,
  IUpdateUserCredentials,
  IUsersRepository,
} from './interfaces';
import { TFindUserCredentials, TFindUsersCredentials } from './types';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private readonly usersRepository: IUsersRepository,
  ) {}

  public createUser(credentials: ICreateUserCredentials) {
    return this.usersRepository.create(credentials);
  }

  public findUser(credentials: TFindUserCredentials) {
    return this.usersRepository.findOne(credentials);
  }

  public findUsers(credentials: TFindUsersCredentials) {
    return this.usersRepository.find(credentials);
  }

  public deleteUser(credentials: IDeleteUserCredentials) {
    return this.usersRepository.deleteById(credentials);
  }

  public updateUser(credentials: IUpdateUserCredentials) {
    return this.usersRepository.updateById(credentials);
  }

  public async isEmailAvailable(email: string): Promise<boolean> {
    const user = await this.findUser({ email });
    if (user) {
      throw new Error('Email already in use!');
    }

    return true;
  }
}
