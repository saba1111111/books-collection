import { HttpException, HttpStatus } from '@nestjs/common';

export class PageNotFoundException extends HttpException {
  constructor(id: number) {
    super(
      `Page with ID #${id} not found. Please verify the ID and try again.`,
      HttpStatus.NOT_FOUND,
    );
  }
}
