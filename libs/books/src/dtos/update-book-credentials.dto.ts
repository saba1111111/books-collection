import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

class UpdatePagesDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}

class UpdateDataDto {
  @ValidateIf((o) => !o.description && !o.pages)
  @IsString()
  @IsNotEmpty()
  title: string;

  @ValidateIf((o) => !o.title && !o.pages)
  @IsString()
  @IsNotEmpty()
  description: string;

  @ValidateIf((o) => !o.title && !o.description)
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdatePagesDto)
  pages: UpdatePagesDto[];
}

export class UpdateBookCredentialsDto {
  @IsNumber()
  @IsNotEmpty()
  bookId: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateDataDto)
  updateData: UpdateDataDto;
}
