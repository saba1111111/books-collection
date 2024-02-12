import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { PasswordValidator } from '../decorators';

export class LoginCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Validate(PasswordValidator)
  password: string;

  @IsNotEmpty()
  @IsString()
  deviceId: string;
}
