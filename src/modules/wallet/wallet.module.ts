import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Wallet } from '@modules/wallet/infra/typeorm/entities/wallet.entity';
import { WalletConfig } from '@modules/wallet/infra/typeorm/entities/wallet-config.entity';

// Controllers
import { CreateWalletController } from './infra/http/controllers/create-wallet.controller';

// Repositories
import { WalletRepository } from './infra/typeorm/repositories/wallet.repository';
import { WalletConfigRepository } from './infra/typeorm/repositories/wallet-config.repository';

// UseCases
import { CreateWalletUseCase } from './useCases/createWallet/create-wallet.useCase';
import { BrokerageService } from '@src/common/services/brokerage/brokerage.service';
import { BinanceService } from '@src/common/services/binance/binance.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, WalletConfig])],
  controllers: [CreateWalletController],
  providers: [
    CreateWalletUseCase,
    BrokerageService,
    WalletRepository,
    WalletConfigRepository,
    {
      provide: 'WALLET_REPOSITORY',
      useClass: WalletRepository,
    },
    {
      provide: BinanceService,
      useValue: {
        apiKey: '',
        apiSecreat: '',
      },
    },
  ],
  exports: [CreateWalletUseCase],
})
export class WalletModule {}
