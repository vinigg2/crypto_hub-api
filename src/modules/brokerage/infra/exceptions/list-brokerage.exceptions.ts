import { HttpException, HttpStatus } from '@nestjs/common';

export class ListBrokerageExceptions extends HttpException {
  constructor() {
    super('Error list brokers', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
