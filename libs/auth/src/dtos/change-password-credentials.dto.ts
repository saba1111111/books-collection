import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { PasswordValidator } from '../decorators';

export class ChangePasswordCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @Validate(PasswordValidator)
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  @Validate(PasswordValidator)
  oldPassword: string;
}
