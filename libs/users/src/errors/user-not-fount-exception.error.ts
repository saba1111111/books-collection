import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super(`Wrong credentials, User not found.`, HttpStatus.NOT_FOUND);
  }
}
