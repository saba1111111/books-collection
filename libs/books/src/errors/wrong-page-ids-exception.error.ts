import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongPageIdsException extends HttpException {
  constructor(bookId: number, inValidPageIds: number[]) {
    super(
      `In book with id: ${bookId}, pages with ids: ${inValidPageIds} does not exist.`,
      HttpStatus.NOT_FOUND,
    );
  }
}
