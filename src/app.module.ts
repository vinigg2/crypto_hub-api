import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import configuration from '@config';

// Middleware
import { CommonAuthMiddleware } from './common/middlewares/common-auth.middleware';

// Services
import { BinanceStreamService } from './common/services/binance/binance-stream.service';
import { BtcPriceService } from './common/services/cryptos/btc-price.service';

// Entities
import { Profile } from '@modules/profile/infra/typeorm/entities/profile.entity';

// WebSocket
import { WebsocketGateway } from '@src/websocket/websocket.gateway';

// Modules
import { HealthModule } from '@modules/health/health.module';
import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { ProfileModule } from '@modules/profile/profile.module';
import { TransactionModule } from '@modules/transaction/transaction.module';
import { WalletModule } from '@modules/wallet/wallet.module';
import { BrokerageModule } from '@modules/brokerage/wallet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<TypeOrmModuleOptions>('database'),
    }),
    HealthModule,
    AuthModule,
    ProfileModule,
    UsersModule,
    WalletModule,
    BrokerageModule,
    TransactionModule,
  ],
  providers: [
    JwtService,
    WebsocketGateway,
    BinanceStreamService,
    BtcPriceService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CommonAuthMiddleware)
      .exclude(
        { path: 'api/v1/health', method: RequestMethod.GET },
        { path: 'api/v1/auth/login', method: RequestMethod.POST },
        { path: 'api/v1/auth/register', method: RequestMethod.POST }, // TODO: REMOVE THIS IS PRODUCTION
      )
      .forRoutes('*');
  }
}
