import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateWalletConfigDTO } from '@src/modules/wallet/dtos/create-wallet-config.dtos';
import { CreateWalletUseCase } from '@src/modules/wallet/useCases/createWallet/create-wallet.useCase';
import { Wallet } from '../../typeorm/entities/wallet.entity';
import { CreateWalletExceptions } from '../../exceptions/create-wallet.exceptions';

@Controller('wallet')
export class CreateWalletController {
  constructor(private createFoundItemUseCase: CreateWalletUseCase) {}
  @Post()
  public async execute(
    @Req() request: any,
    @Body() item: CreateWalletConfigDTO,
  ): Promise<Wallet> {
    try {
      // console.log(request);
      return await this.createFoundItemUseCase.execute({
        ...item,
        profile: request.profile,
      });
    } catch (e) {
      new CreateWalletExceptions();
    }
  }
}
