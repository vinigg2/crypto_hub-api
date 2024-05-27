import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateUserException extends HttpException {
  constructor(err?: Error) {
    super(
      `Error create user. message ${err.message}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
