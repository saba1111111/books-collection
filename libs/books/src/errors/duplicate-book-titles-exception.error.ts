import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateBookInUserListException extends HttpException {
  constructor() {
    super(
      'A book with the same title already exists in your list. Please choose a different title.',
      HttpStatus.CONFLICT,
    );
  }
}
