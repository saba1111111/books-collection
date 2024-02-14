import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidRefreshTokenException extends HttpException {
  constructor() {
    super(
      'The provided refresh token is invalid. Please check your cookies or re-login.',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
