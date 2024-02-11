import { Module } from '@nestjs/common';

// Controllers
import { CreateTransactionController } from './infra/http/controllers/create-transaction.controller';
import { ListTransactionController } from './infra/http/controllers/list-transaction.controller';
import { ShowTransactionController } from './infra/http/controllers/show-transaction.controller';

// Repositories
import { TransactionRepository } from './infra/typeorm/repositories/transaction.repository';

// UseCases
import { CreateTransactionUseCase } from './useCases/createTransaction/create-transaction';
import { ListTransactionUseCase } from './useCases/listTransaction /list-transaction';
import { ShowTransactionUseCase } from './useCases/showTransaction/show-transaction';

@Module({
  imports: [],
  controllers: [
    CreateTransactionController,
    ListTransactionController,
    ShowTransactionController,
  ],
  providers: [
    CreateTransactionUseCase,
    ListTransactionUseCase,
    ShowTransactionUseCase,
    {
      provide: 'TRANSACTION_REPOSITORY',
      inject: [TransactionRepository],
      useClass: TransactionRepository,
    },
  ],
  exports: [
    CreateTransactionUseCase,
    ListTransactionUseCase,
    ShowTransactionUseCase,
  ],
})
export class TransactionModule {}
