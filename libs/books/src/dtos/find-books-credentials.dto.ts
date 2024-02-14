import { IsNotEmpty, IsNumber } from 'class-validator';
import { TransformStringToNumber } from 'libs/common/decorators';
import { PaginationCredentialsDto } from 'libs/common/dtos';

export class FindBooksCredentialsDto extends PaginationCredentialsDto {
  @TransformStringToNumber()
  @IsNotEmpty()
  @IsNumber()
  authorId?: number;
}
