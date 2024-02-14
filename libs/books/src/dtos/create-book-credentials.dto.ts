import { Injectable } from '@nestjs/common';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { CreatePageCredentialsDto } from 'libs/pages/dtos';
import { Type } from 'class-transformer';
import { IsSequentialConstraint } from '../decorators';

@Injectable()
export class CreateBookCredentialsDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreatePageCredentialsDto)
  @Validate(IsSequentialConstraint)
  pages: CreatePageCredentialsDto[];

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  title: string;
}
