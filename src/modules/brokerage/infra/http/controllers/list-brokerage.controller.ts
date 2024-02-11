import { Controller, Get } from '@nestjs/common';
import { Brokerage } from '../../typeorm/entities/brokerage.entity';
import { ListBrokerageExceptions } from '../../exceptions/list-brokerage.exceptions';
import { ListBrokerageUseCase } from '@src/modules/brokerage/useCases/listBrokerage/list-brokerage.useCase';

@Controller('brokers')
export class ListBrokerageController {
  constructor(private listBrokerageUseCase: ListBrokerageUseCase) {}
  @Get()
  public async execute(): Promise<Brokerage[]> {
    try {
      return await this.listBrokerageUseCase.list();
    } catch (e) {
      new ListBrokerageExceptions();
    }
  }
}
