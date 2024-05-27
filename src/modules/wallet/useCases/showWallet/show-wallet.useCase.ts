import { Inject, Injectable } from '@nestjs/common';
import { IWalletRepository } from '../../repositories/IWallet.repository';
import { Wallet } from '../../infra/typeorm/entities/wallet.entity';
import { CreateWalletConfigExceptions } from '../../infra/exceptions/create-wallet-config.exceptions';
import { IWalletConfigRepository } from '../../repositories/IWalletConfig.repository';
import { CreateWalletConfigDTO } from '../../dtos/create-wallet-config.dtos';
import { IBrokerageService } from '@src/common/services/brokerage/brokerage.interface';

@Injectable()
export class ShowWalletUseCase {
  constructor(
    @Inject('WALLET_REPOSITORY')
    private ormRepository: IWalletRepository,
    @Inject('WALLET_REPOSITORY')
    private ormRepositoryWalletConfig: IWalletConfigRepository,
  ) {}

  public async execute(id: string): Promise<Wallet> {
    try {
      return await this.ormRepository.show(id);
    } catch (err) {
      throw new CreateWalletConfigExceptions();
    }
  }
}
