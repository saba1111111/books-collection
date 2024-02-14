import { HttpException, HttpStatus } from '@nestjs/common';

export class RefreshTokenExpiredException extends HttpException {
  constructor() {
    super(
      'Your refresh token has expired. Please log in again to obtain a new one.',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
