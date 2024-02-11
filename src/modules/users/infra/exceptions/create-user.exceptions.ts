import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateUserException extends HttpException {
  constructor() {
    super('Error create user', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
