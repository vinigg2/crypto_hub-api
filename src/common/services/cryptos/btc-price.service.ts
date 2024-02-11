import { Injectable } from '@nestjs/common';
import { BinanceService } from '../binance/binance.service';

@Injectable()
export class BtcPriceService {
  constructor(private readonly binanceService: BinanceService) {
    this.binanceService.getPriceUpdates().subscribe((price) => {
      this.handlePriceChange(price);
    });
  }

  private handlePriceChange(price: number) {
    console.log('Preço do BTC mudou para:', price);
  }
}
