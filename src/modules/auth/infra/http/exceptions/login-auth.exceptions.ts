import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthenticationException extends HttpException {
  constructor() {
    super('E-mail or password wrong', HttpStatus.NOT_FOUND);
  }
}
