import { HttpException } from '@nestjs/common';
import { InternalServerErrorException } from '../errors';

export function handleError(error: unknown) {
  if (error instanceof HttpException) {
    const statusCode = error.getStatus();

    const response = error.getResponse();
    const message = typeof response === 'object' ? response['message'] : response;

    // log errors for debugging
    console.log(`Error status: ${statusCode}, message: ${message}`);

    throw new HttpException(message, statusCode);
  } else {
    // log errors for debugging
    console.log('Un handled error', error);
    throw new InternalServerErrorException();
  }
}
