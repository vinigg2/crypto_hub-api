import { CreateWalletDTO } from '../dtos/create-wallet.dtos';
import { WalletDTO } from '../dtos/wallet.dtos';

export interface IWalletRepository {
  create(item: CreateWalletDTO): Promise<WalletDTO>;
  show(id: string): Promise<WalletDTO>;
}
