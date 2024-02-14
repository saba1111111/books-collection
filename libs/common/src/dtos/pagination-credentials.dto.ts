import { IsIn, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { IsPositiveIntegerConstraint } from '../decorators';
import { Type } from 'class-transformer';
import { PaginationData } from '../constants';

export class PaginationCredentialsDto {
  @IsOptional()
  @Validate(IsPositiveIntegerConstraint)
  page?: number;

  @IsOptional()
  @Validate(IsPositiveIntegerConstraint)
  numberOfItemsPerPage?: number;

  @IsOptional()
  @IsIn(PaginationData.order)
  createdAt?: string;

  @IsOptional()
  @IsIn(PaginationData.order)
  updatedAt?: string;
}
