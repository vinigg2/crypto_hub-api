import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateTransactionUseCase } from '@src/modules/transaction/useCases/createTransaction/create-transaction';
import { CreateTransactionDTO } from '@src/modules/transaction/dtos/create-transaction.dtos';
import { Transaction } from '../../typeorm/entities/transaction.entity';

@Controller('transaction')
export class CreateTransactionController {
  constructor(private createTransaction: CreateTransactionUseCase) {}

  @Post()
  public async execute(
    @Body() transaction: CreateTransactionDTO,
    @Req() request: any,
  ): Promise<Transaction> {
    return await this.createTransaction.execute(transaction);
  }
}
