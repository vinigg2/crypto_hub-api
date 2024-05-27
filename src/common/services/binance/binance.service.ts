import { Injectable } from '@nestjs/common';
import Binance, { Account, Order, OrderType } from 'binance-api-node';
import { IBuyBinance, ISellBinance } from './binance.interface';
import { IBrokerageDataService } from '../brokerage/brokerage.interface';

@Injectable()
export class BinanceService implements IBrokerageDataService {
  private binance: any;

  constructor(apiKey: string, apiSecret: string) {
    this.binance = Binance({
      apiKey,
      apiSecret,
    });
  }

  async getWallet(): Promise<Account> {
    return this.binance.accountInfo();
  }

  async sell({ quantity, price, symbol }: ISellBinance): Promise<Order> {
    return this.binance.orderTest({
      price,
      quantity,
      side: 'SELL',
      type: OrderType.LIMIT,
      symbol,
    });
  }

  async buy({ quantity, price, symbol }: IBuyBinance): Promise<Order> {
    return this.binance.orderTest({
      price,
      quantity,
      side: 'BUY',
      type: OrderType.LIMIT,
      symbol,
    });
  }
}
