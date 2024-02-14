import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedBookDeletionException extends HttpException {
  constructor() {
    super('Only the author of a book can delete it.', HttpStatus.FORBIDDEN);
  }
}
