import { Inject, Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../../repositories/ITransaction.respotiroy';
import { CreateTransactionDTO } from '../../dtos/create-transaction.dtos';
import { Transaction } from '../../infra/typeorm/entities/transaction.entity';

@Injectable()
export class ShowTransactionUseCase {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private ormRepository: ITransactionRepository,
  ) {}

  public async execute(id: string): Promise<Transaction> {
    try {
      return await this.ormRepository.show(id);
    } catch (err) {
      throw new CreateTransactionDTO();
    }
  }
}
