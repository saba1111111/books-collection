import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TransformStringToNumber } from 'libs/common/decorators';

export class DeleteBookCredentialsDto {
  @TransformStringToNumber()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
