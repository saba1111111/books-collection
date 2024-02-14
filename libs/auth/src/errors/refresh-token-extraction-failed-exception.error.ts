import { HttpException, HttpStatus } from '@nestjs/common';

export class RefreshTokenExtractionFailedException extends HttpException {
  constructor() {
    super(
      'Unable to extract refresh token from cookies. Please check your cookies or try logging in again.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
