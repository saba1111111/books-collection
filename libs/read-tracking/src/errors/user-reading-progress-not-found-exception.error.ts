import { HttpException, HttpStatus } from '@nestjs/common';

export class UserProgressNotFoundException extends HttpException {
  constructor() {
    super(
      'Unable to find your progress for this book. Please try again later or contact us for assistance.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
