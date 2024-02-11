import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateWalletExceptions extends HttpException {
  constructor() {
    super('Error create wallet', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
