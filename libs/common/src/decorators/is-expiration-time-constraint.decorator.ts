import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsExpirationTimeConstraint', async: false })
export class IsExpirationTimeConstraint implements ValidatorConstraintInterface {
  validate(time: string, args: ValidationArguments) {
    return /^\d+s$/.test(time);
  }

  defaultMessage(args: ValidationArguments) {
    return `The value ${args.value} is not a valid expiration time format (should be digits followed by 's')`;
  }
}
