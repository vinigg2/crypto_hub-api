import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateTransactionExceptions extends HttpException {
  constructor() {
    super('Error create transaction', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
