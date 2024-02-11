import { Inject, Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../../repositories/ITransaction.respotiroy';
import { CreateTransactionDTO } from '../../dtos/create-transaction.dtos';
import { Transaction } from '../../infra/typeorm/entities/transaction.entity';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private ormRepository: ITransactionRepository,
  ) {}

  public async execute(item: CreateTransactionDTO): Promise<Transaction> {
    try {
      return await this.ormRepository.create(item);
    } catch (err) {
      throw new CreateTransactionDTO();
    }
  }
}
