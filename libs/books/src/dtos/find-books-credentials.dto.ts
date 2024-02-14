import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { TransformStringToNumber } from 'libs/common/decorators';
import { PaginationCredentialsDto } from 'libs/common/dtos';

export class FindBooksCredentialsDto extends PaginationCredentialsDto {
  @TransformStringToNumber()
  @IsOptional()
  @IsNumber()
  authorId?: number;
}
