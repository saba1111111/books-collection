import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { CreatePageCredentialsDto } from 'libs/pages/dtos';

@ValidatorConstraint({ async: true })
export class IsSequentialConstraint implements ValidatorConstraintInterface {
  validate(pages: CreatePageCredentialsDto[], args: ValidationArguments) {
    const pageNumbers = pages.map((page) => page.pageNumber).sort((a, b) => a - b);
    for (let i = 0; i < pageNumbers.length - 1; i++) {
      if (pageNumbers[i] + 1 !== pageNumbers[i + 1]) {
        return false;
      }
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Page numbers must be sequential without gaps.';
  }
}
