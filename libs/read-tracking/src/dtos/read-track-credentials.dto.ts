import { IsNotEmpty, IsNumber } from 'class-validator';
import { TransformStringToNumber } from 'libs/common/decorators';

export class ReadTrackCredentialsDto {
  @TransformStringToNumber()
  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @TransformStringToNumber()
  @IsNotEmpty()
  @IsNumber()
  pageId: number;
}
