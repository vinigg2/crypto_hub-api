import { Injectable } from '@nestjs/common';
import { BinanceStreamService } from '../binance/binance-stream.service';
import { WebsocketGateway } from '@src/websocket/websocket.gateway';

@Injectable()
export class BtcPriceService {
  constructor(
    private readonly binanceStreamService: BinanceStreamService,
    private readonly websocketGateway: WebsocketGateway,
  ) {
    this.binanceStreamService.getPriceUpdates().subscribe((btc) => {
      this.handlePriceChange(btc);
    });
  }

  private handlePriceChange(btc: any) {
    const payload = {
      message: 'update:btc',
      data: btc,
    };

    this.websocketGateway.sendToAll(payload);
  }
}
