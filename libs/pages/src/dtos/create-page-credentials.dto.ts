import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreatePageCredentialsDto {
  @IsInt()
  @Min(1)
  pageNumber: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
