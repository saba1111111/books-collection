import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'nameValidator', async: false })
export class NameValidator implements ValidatorConstraintInterface {
  validate(name: string, args: ValidationArguments) {
    const regex = /^[A-Za-z\s]{2,30}$/;
    return typeof name === 'string' && regex.test(name);
  }

  defaultMessage(args: ValidationArguments) {
    // Default error message
    return 'Name must be between 2 and 30 characters long and can only contain letters and spaces.';
  }
}
