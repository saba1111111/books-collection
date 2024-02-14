import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY_TOKEN } from './constants';
import {
  ICreateUserCredentials,
  IDeleteUserCredentials,
  IUpdateUserCredentials,
  IUsersRepository,
} from './interfaces';
import { TFindUserCredentials, TFindUsersCredentials } from './types';
import { EmailAlreadyInUseException, UserNotFoundException } from './errors';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private readonly usersRepository: IUsersRepository,
  ) {}

  public async checkUserExistence(id: number) {
    const user = await this.findUser({ id: Number(id) });
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

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
      throw new EmailAlreadyInUseException();
    }

    return true;
  }
}
