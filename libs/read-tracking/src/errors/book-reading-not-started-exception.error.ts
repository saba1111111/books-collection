import { HttpException, HttpStatus } from '@nestjs/common';

export class BookNotStartedException extends HttpException {
  constructor() {
    super(
      "Looks like you haven't started reading this book yet! Would you like to start reading now?",
      HttpStatus.PRECONDITION_FAILED,
    );
  }
}
