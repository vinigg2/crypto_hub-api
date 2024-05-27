import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Wallet } from '../entities/wallet.entity';
import { IWalletRepository } from '@src/modules/wallet/repositories/IWallet.repository';
import { CreateWalletDTO } from '@src/modules/wallet/dtos/create-wallet.dtos';
import { CreateWalletExceptions } from '../../exceptions/create-wallet.exceptions';
import { BrokerageService } from '@src/common/services/brokerage/brokerage.service';
import { WalletDTO } from '@src/modules/wallet/dtos/wallet.dtos';

@EntityRepository(Wallet)
export class WalletRepository implements IWalletRepository {
  private ormRepository: Repository<Wallet>;
  private brokerageService: BrokerageService;

  constructor(manager: EntityManager, brokerageService: BrokerageService) {
    this.brokerageService = brokerageService;
    this.ormRepository = manager.getRepository(Wallet);
  }

  async create({
    wallet_config,
    profile,
  }: CreateWalletDTO): Promise<WalletDTO> {
    try {
      const { apiKey, apiSecret, id } = wallet_config;

      const newWallet = this.ormRepository.create({
        id: uuid(),
        wallet_config: id,
        profile,
      });

      const wallet = this.ormRepository.save(newWallet);

      const brokerageService = this.brokerageService.getBrokerageService(
        wallet_config.brokerage.name,
        apiKey,
        apiSecret,
      );

      const wallet_broker = brokerageService.getWallet();

      return {
        ...wallet,
        wallet_broker,
      };
    } catch (err) {
      throw new CreateWalletExceptions();
    }
  }

  async show(id: string): Promise<WalletDTO> {
    const wallet = await this.ormRepository.findOne({ id });
    const { apiKey, apiSecret, brokerage } = wallet.wallet_config;
    const brokerageService = this.brokerageService.getBrokerageService(
      brokerage.name,
      apiKey,
      apiSecret,
    );

    const wallet_broker = brokerageService.getWallet();
    return {
      ...wallet,
      wallet_broker,
    };
  }
}
