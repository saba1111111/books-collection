import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class IVerifyUserCredentialsDto {
  @IsNumber()
  @IsNotEmpty()
  code: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
