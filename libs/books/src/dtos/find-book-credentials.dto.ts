import { IsNotEmpty, IsNumber } from 'class-validator';
import { TransformStringToNumber } from 'libs/common/decorators';

export class FindBookCredentialsDto {
  @TransformStringToNumber()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
