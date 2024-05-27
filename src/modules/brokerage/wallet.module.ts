import { Module } from '@nestjs/common';

// Entities
import { Brokerage } from './infra/typeorm/entities/brokerage.entity';

// Controllers
import { ListBrokerageController } from './infra/http/controllers/list-brokerage.controller';

// UseCases
import { ListBrokerageUseCase } from './useCases/listBrokerage/list-brokerage.useCase';

@Module({
  imports: [],
  controllers: [ListBrokerageController],
  providers: [
    ListBrokerageUseCase,
    {
      provide: 'BROKERAGE_REPOSITORY',
      inject: [Brokerage],
      useClass: Brokerage,
    },
  ],
  exports: [ListBrokerageUseCase],
})
export class BrokerageModule {}
