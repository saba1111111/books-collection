import { HttpException, HttpStatus } from '@nestjs/common';

export class BookNotFoundException extends HttpException {
  constructor() {
    super('Wrong credentials, Can not find book.', HttpStatus.NOT_FOUND);
  }
}
