import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Wallet } from '../entities/wallet.entity';
import { IWalletRepository } from '@src/modules/wallet/repositories/IWallet.repository';
import { CreateWalletDTO } from '@src/modules/wallet/dtos/create-wallet.dtos';
import { CreateWalletExceptions } from '../../exceptions/create-wallet.exceptions';

@EntityRepository(Wallet)
export class WalletRepository implements IWalletRepository {
  private ormRepository: Repository<Wallet>;

  constructor(manager: EntityManager) {
    this.ormRepository = manager.getRepository(Wallet);
  }

  async create({ wallet_config, profile }: CreateWalletDTO): Promise<Wallet> {
    try {
      const newWallet = this.ormRepository.create({
        id: uuid(),
        wallet_config,
        profile,
      });

      return this.ormRepository.save(newWallet);
    } catch (err) {
      throw new CreateWalletExceptions();
    }
  }

  show(id: string): Promise<Wallet> {
    return this.ormRepository.findOne({ id });
  }

  list(): Promise<Wallet[]> {
    return this.ormRepository.find();
  }
}
