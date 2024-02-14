import { HttpException, HttpStatus } from '@nestjs/common';

export class UnchangedTitleException extends HttpException {
  constructor() {
    super(
      "The title field requires a unique value. Please choose a different title that's not already used. ",
      HttpStatus.BAD_REQUEST,
    );
  }
}
