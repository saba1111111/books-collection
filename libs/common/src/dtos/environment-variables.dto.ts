import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsPort } from './is-port.dto';
import { IsExpirationTimeConstraint } from '../decorators';

export class EnvironmentVariablesDto {
  @IsNotEmpty()
  @IsString()
  DATABASE_TYPE: string;

  @IsNotEmpty()
  @IsString()
  POSTGRES_HOST: string;

  @IsPort()
  POSTGRES_PORT: number;

  @IsNotEmpty()
  @IsString()
  POSTGRES_USER: string;

  @IsNotEmpty()
  @IsString()
  POSTGRES_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  POSTGRES_DB: string;

  @IsPort()
  REDIS_PORT: number;

  @IsNotEmpty()
  @IsString()
  REDIS_HOST: string;

  @IsNotEmpty()
  @IsEmail()
  EMAIL: string;

  @IsNotEmpty()
  @IsString()
  EMAIL_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  ACCESS_TOKEN_SECRET: string;

  @IsNotEmpty()
  @Validate(IsExpirationTimeConstraint)
  ACCESS_TOKEN_EXPIRATION_TIME: string;

  @IsNotEmpty()
  @IsString()
  REFRESH_TOKEN_SECRET: string;

  @IsNotEmpty()
  @Validate(IsExpirationTimeConstraint)
  REFRESH_TOKEN_EXPIRATION_TIME: string;
}
