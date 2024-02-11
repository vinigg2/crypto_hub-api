import { HttpException, HttpStatus } from '@nestjs/common';

export class RegisterAuthException extends HttpException {
  constructor() {
    super('Authentication failed', HttpStatus.UNAUTHORIZED);
  }
}
