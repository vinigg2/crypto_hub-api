import { CreateWalletConfigDTO } from '../dtos/create-wallet-config.dtos';
import { WalletConfigDTO } from '../dtos/wallet-config.dtos';

export interface IWalletConfigRepository {
  create(item: CreateWalletConfigDTO): Promise<WalletConfigDTO>;
}
