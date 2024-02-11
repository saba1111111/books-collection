import { Injectable, OnModuleInit } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { EnvironmentVariablesDto } from '../dtos';

@Injectable()
export class EnvironmentVariablesValidationService implements OnModuleInit {
  async onModuleInit() {
    const envVars = plainToClass(EnvironmentVariablesDto, process.env);

    const errors = await validate(envVars);
    if (errors.length > 0) {
      throw new Error(`Environment validation error: ${errors}`);
    }
  }
}
