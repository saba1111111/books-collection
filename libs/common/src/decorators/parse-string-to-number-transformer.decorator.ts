import { Transform } from 'class-transformer';

export function TransformStringToNumber() {
  return Transform(({ value }) =>
    !isNaN(parseFloat(value)) ? parseFloat(value) : value,
  );
}
