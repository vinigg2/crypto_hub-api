import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateWalletConfigExceptions extends HttpException {
  constructor() {
    super('Error create wallet config', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
