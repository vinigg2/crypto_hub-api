import { Controller, Get, Req } from '@nestjs/common';
import { Transaction } from '../../typeorm/entities/transaction.entity';
import { ListTransactionUseCase } from '@src/modules/transaction/useCases/listTransaction /list-transaction';

@Controller('transaction')
export class ListTransactionController {
  constructor(private listTransaction: ListTransactionUseCase) {}

  @Get()
  public async execute(@Req() request: any): Promise<Transaction[]> {
    return await this.listTransaction.execute();
  }
}
