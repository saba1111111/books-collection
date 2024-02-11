import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsPort } from './is-port.dto';

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
}
