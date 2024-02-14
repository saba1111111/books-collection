import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundFromTokenException extends HttpException {
  constructor() {
    super(
      'Unable to identify the user associated with the provided token. Please verify the token or try logging in again.',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
