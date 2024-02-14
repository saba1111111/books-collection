import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedBookUpdateException extends HttpException {
  constructor() {
    super('Only the book author is authorized to update it.', HttpStatus.UNAUTHORIZED);
  }
}
