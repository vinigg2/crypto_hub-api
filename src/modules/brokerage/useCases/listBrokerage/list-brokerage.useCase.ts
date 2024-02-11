import { Inject, Injectable } from '@nestjs/common';
import { IBrokerageRepository } from '../../repositories/IBrokerage.repository';
import { Brokerage } from '../../infra/typeorm/entities/brokerage.entity';

@Injectable()
export class ListBrokerageUseCase {
  constructor(
    @Inject('BROKERAGE_REPOSITORY')
    private ormRepository: IBrokerageRepository,
  ) {}

  public async list(): Promise<Brokerage[]> {
    return await this.ormRepository.list();
  }
}
