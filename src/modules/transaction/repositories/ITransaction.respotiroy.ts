import { CreateTransactionDTO } from '../dtos/create-transaction.dtos';
import { TransactionDTO } from '../dtos/transaction.dtos';

export interface ITransactionRepository {
  create(item: CreateTransactionDTO): Promise<TransactionDTO>;
  show(id: string): Promise<TransactionDTO>;
  list(): Promise<TransactionDTO[]>;
}
