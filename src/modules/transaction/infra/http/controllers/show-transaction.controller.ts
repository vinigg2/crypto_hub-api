import { Controller, Get, Req } from '@nestjs/common';
import { Transaction } from '../../typeorm/entities/transaction.entity';
import { ShowTransactionUseCase } from '@src/modules/transaction/useCases/showTransaction/show-transaction';

@Controller('transaction/:id')
export class ShowTransactionController {
  constructor(private showTransaction: ShowTransactionUseCase) {}

  @Get()
  public async execute(@Req() request: any): Promise<Transaction> {
    return await this.showTransaction.execute(request.params.id);
  }
}
