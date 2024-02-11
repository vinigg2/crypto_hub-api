import { Module } from '@nestjs/common';

// Controllers
import { CreateWalletController } from './infra/http/controllers/create-wallet.controller';

// Repositories
import { WalletRepository } from './infra/typeorm/repositories/wallet.repository';
import { WalletConfigRepository } from './infra/typeorm/repositories/wallet-config.repository';

// UseCases
import { CreateWalletUseCase } from './useCases/createWallet/create-wallet.useCase';

@Module({
  imports: [],
  controllers: [CreateWalletController],
  providers: [
    CreateWalletUseCase,
    {
      provide: 'WALLET_REPOSITORY',
      inject: [WalletRepository, WalletConfigRepository],
      useClass: WalletRepository,
    },
  ],
  exports: [CreateWalletUseCase],
})
export class WalletModule {}
