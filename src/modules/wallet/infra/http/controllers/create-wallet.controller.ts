import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateWalletConfigDTO } from '@src/modules/wallet/dtos/create-wallet-config.dtos';
import { CreateWalletUseCase } from '@src/modules/wallet/useCases/createWallet/create-wallet.useCase';
import { Wallet } from '../../typeorm/entities/wallet.entity';
import { CreateWalletExceptions } from '../../exceptions/create-wallet.exceptions';

@Controller('wallet')
export class CreateWalletController {
  constructor(private createFoundItemUseCase: CreateWalletUseCase) {}
  @Post()
  public async execute(@Body() item: CreateWalletConfigDTO): Promise<Wallet> {
    try {
      return await this.createFoundItemUseCase.execute(item);
    } catch (e) {
      new CreateWalletExceptions();
    }
  }
}
