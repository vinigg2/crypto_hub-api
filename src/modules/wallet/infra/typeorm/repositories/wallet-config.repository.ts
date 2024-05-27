import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { WalletConfig } from '../entities/wallet-config.entity';
import { CreateWalletConfigExceptions } from '../../exceptions/create-wallet-config.exceptions';
import { IWalletConfigRepository } from '@src/modules/wallet/repositories/IWalletConfig.repository';
import { CreateWalletConfigDTO } from '@src/modules/wallet/dtos/create-wallet-config.dtos';

@EntityRepository(WalletConfig)
export class WalletConfigRepository implements IWalletConfigRepository {
  private ormRepository: Repository<WalletConfig>;

  constructor(manager: EntityManager) {
    this.ormRepository = manager.getRepository(WalletConfig);
  }
  async create({
    broker,
    apiKey,
    apiSecret,
    code,
    available_value,
    quantity,
    active,
    lever,
    profile,
  }: CreateWalletConfigDTO): Promise<WalletConfig> {
    try {
      const dataWalletConfig = {
        id: uuid(),
        code,
        available_value,
        quantity,
        active,
        lever,
        apiKey,
        apiSecret,
        broker,
        profile,
      };

      const newConfigWallet = this.ormRepository.create(dataWalletConfig);
      return this.ormRepository.save(newConfigWallet);
    } catch (err) {
      throw new CreateWalletConfigExceptions();
    }
  }
}
