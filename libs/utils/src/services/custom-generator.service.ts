import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { IGeneratorService } from '../interfaces';

@Injectable()
export class CustomGeneratorService implements IGeneratorService {
  constructor() {}

  public generateCode(digits: number): number {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
