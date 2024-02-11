import { Inject, Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../../repositories/ITransaction.respotiroy';
import { CreateTransactionDTO } from '../../dtos/create-transaction.dtos';
import { Transaction } from '../../infra/typeorm/entities/transaction.entity';

@Injectable()
export class ListTransactionUseCase {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private ormRepository: ITransactionRepository,
  ) {}

  public async execute(): Promise<Transaction[]> {
    try {
      return await this.ormRepository.list();
    } catch (err) {
      throw new CreateTransactionDTO();
    }
  }
}
