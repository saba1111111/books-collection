import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsPositiveInteger', async: false })
export class IsPositiveIntegerConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const numberValue = Number(value);
    return !isNaN(numberValue) && Number.isInteger(numberValue) && numberValue > 0;
  }

  defaultMessage(args: ValidationArguments) {
    return `The value ${args.value} is not a valid positive integer string`;
  }
}
