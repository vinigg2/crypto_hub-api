import { HttpException, HttpStatus } from '@nestjs/common';

export class FindProfileException extends HttpException {
  constructor() {
    super('Error find profile', HttpStatus.NOT_FOUND);
  }
}
