import { Injectable } from '@nestjs/common';
import {
  IBrokerageDataService,
  IBrokerageService,
} from './brokerage.interface';
import { BinanceService } from '../binance/binance.service';

@Injectable()
export class BrokerageService implements IBrokerageService {
  services: {
    binance: BinanceService;
  };
  constructor(private readonly binanceService: BinanceService) {
    this.services = {
      binance: this.binanceService,
    };
  }

  getBrokerageService(brokerageName, apiKey, apiSecret): IBrokerageDataService {
    if (!this.services[brokerageName]) {
      throw new Error(
        `Serviço de corretagem '${brokerageName}' não suportado.`,
      );
    }

    return new this.services[brokerageName](apiKey, apiSecret);
  }
}
