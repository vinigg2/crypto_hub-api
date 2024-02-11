import { Inject, Injectable } from '@nestjs/common';
import { IWalletRepository } from '../../repositories/IWallet.repository';
import { Wallet } from '../../infra/typeorm/entities/wallet.entity';
import { CreateWalletConfigExceptions } from '../../infra/exceptions/create-wallet-config.exceptions';
import { IWalletConfigRepository } from '../../repositories/IWalletConfig.repository';
import { CreateWalletConfigDTO } from '../../dtos/create-wallet-config.dtos';

@Injectable()
export class CreateWalletUseCase {
  constructor(
    @Inject('WALLET_REPOSITORY')
    private ormRepository: IWalletRepository,
    private ormRepositoryWalletConfig: IWalletConfigRepository,
  ) {}

  public async execute(item: CreateWalletConfigDTO): Promise<Wallet> {
    try {
      const wallet_config = await this.ormRepositoryWalletConfig.create(item);
      return await this.ormRepository.create({
        wallet_config,
        profile: item.profile,
      });
    } catch (err) {
      throw new CreateWalletConfigExceptions();
    }
  }
}
