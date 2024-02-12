import { Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';
import { IHashService } from '../interfaces';

@Injectable()
export class BcryptService implements IHashService {
  public async hash(
    value: string | Buffer,
    saltRounds: number = 10,
  ): Promise<string> {
    const salt = await genSalt(saltRounds);
    return hash(value, salt);
  }

  public async compare(
    value: string | Buffer,
    encryptedValue: string,
  ): Promise<boolean> {
    return compare(value, encryptedValue);
  }
}
