import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'customPasswordValidation', async: false })
export class PasswordValidator implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return typeof password === 'string' && regex.test(password);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Password must be stronger: at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
  }
}
