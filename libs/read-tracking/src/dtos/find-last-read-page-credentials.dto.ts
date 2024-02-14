import { IsNotEmpty, IsNumber } from 'class-validator';
import { TransformStringToNumber } from 'libs/common/decorators';

export class FindLastReadPageCredentials {
  @TransformStringToNumber()
  @IsNotEmpty()
  @IsNumber()
  bookId: number;
}
