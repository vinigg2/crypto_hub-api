import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthenticationException extends HttpException {
  constructor(err?: Error, status = HttpStatus.INTERNAL_SERVER_ERROR) {
    super(err.message || 'E-mail or password wrong', status);
  }
}
