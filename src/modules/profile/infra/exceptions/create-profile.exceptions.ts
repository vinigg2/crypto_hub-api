import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateProfileException extends HttpException {
  constructor() {
    super('Error create profile', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
