import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Brokerage } from '../entities/brokerage.entity';
import { IBrokerageRepository } from '@src/modules/brokerage/repositories/IBrokerage.repository';
import { ListBrokerageExceptions } from '../../exceptions/list-brokerage.exceptions';

@EntityRepository(Brokerage)
export class BrokerageRepository implements IBrokerageRepository {
  private ormRepository: Repository<Brokerage>;

  constructor(manager: EntityManager) {
    this.ormRepository = manager.getRepository(Brokerage);
  }

  async list() {
    try {
      return this.ormRepository.find();
    } catch (err) {
      throw new ListBrokerageExceptions();
    }
  }
}
