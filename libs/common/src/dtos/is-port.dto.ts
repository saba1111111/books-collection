import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export function IsPort() {
  return applyDecorators(
    IsNotEmpty(),
    IsInt(),
    Min(1),
    Max(65535),
    Transform(({ value }) => parseInt(value, 10), { toClassOnly: true }),
  );
}
