import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { NameValidator, PasswordValidator } from '../decorators';

export class RegisterUserDto {
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
  @Validate(NameValidator)
  name: string;
}
