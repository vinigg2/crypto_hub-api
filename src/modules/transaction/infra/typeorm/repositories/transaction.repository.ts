import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDTO } from '@src/modules/transaction/dtos/create-transaction.dtos';
import { ITransactionRepository } from '@src/modules/transaction/repositories/ITransaction.respotiroy';
import { CreateTransactionExceptions } from '../../exceptions/create-transaction.exceptions';

@EntityRepository(Transaction)
export class TransactionRepository implements ITransactionRepository {
  private ormRepository: Repository<Transaction>;

  constructor(manager: EntityManager) {
    this.ormRepository = manager.getRepository(Transaction);
  }

  async create(transaction: CreateTransactionDTO): Promise<Transaction> {
    try {
      const newTransaction = this.ormRepository.create({
        id: uuid(),
        ...transaction,
      });
      return this.ormRepository.save(newTransaction);
    } catch (err) {
      throw new CreateTransactionExceptions();
    }
  }

  show(id: string): Promise<Transaction> {
    return this.ormRepository.findOne({ id });
  }

  list(): Promise<Transaction[]> {
    return this.ormRepository.find();
  }
}
