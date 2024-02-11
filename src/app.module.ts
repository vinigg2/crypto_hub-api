import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import configuration from '@config';

// Middleware
import { CommonAuthMiddleware } from './common/middlewares/common-auth.middleware';

// Services
import { BinanceService } from './common/services/binance/binance.service';
import { BtcPriceService } from './common/services/cryptos/btc-price.service';

// Modules
import { HealthModule } from '@modules/health/health.module';
import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { ProfileModule } from '@modules/profile/profile.module';
import { JwtService } from '@nestjs/jwt';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
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
    TransactionModule,
  ],
  providers: [JwtService, BinanceService, BtcPriceService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CommonAuthMiddleware)
      .exclude(
        { path: 'health', method: RequestMethod.GET },
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/register', method: RequestMethod.POST }, // TODO: REMOVE THIS IS PRODUCTION
      )
      .forRoutes('*');
  }
}
