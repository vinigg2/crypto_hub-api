import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';
import { Subject } from 'rxjs';
import Binance, { Account, Order, OrderType } from 'binance-api-node';
import { IBuyBinance, ISellBinance } from './binance.interface';

@Injectable()
export class BinanceService {
  private readonly binanceWebSocketUrl =
    'wss://stream.binance.com:9443/ws/btcusdt@trade'; // TODO: Set this at .env
  private readonly socket: WebSocket;
  private readonly priceSubject: Subject<number> = new Subject<number>();
  private previousPrice: number;

  constructor() {
    this.socket = new WebSocket(this.binanceWebSocketUrl);

    this.socket.on('message', (data: string) => {
      const parsedData = JSON.parse(data);
      const price = parseFloat(parsedData.p);
      this.handlePriceChange(price);
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket Error:', error);
    });

    this.socket.on('close', () => {
      console.log('WebSocket Closed');
      setTimeout(() => this.reconnectToBinanceWebSocket(), 5000);
    });
  }

  private handlePriceChange(newPrice: number) {
    if (this.previousPrice !== undefined) {
      const variationPercentage = this.calculateVariationPercentage(
        this.previousPrice,
        newPrice,
      );

      if (variationPercentage > 1.0) {
        this.handleSignificantVariation(newPrice, variationPercentage);
      }
    }

    this.previousPrice = newPrice;
  }

  private calculateVariationPercentage(
    previousPrice: number,
    newPrice: number,
  ): number {
    return ((newPrice - previousPrice) / previousPrice) * 100.0;
  }

  private handleSignificantVariation(
    newPrice: number,
    variationPercentage: number,
  ) {
    console.log(
      `Variação de ${variationPercentage.toFixed(
        2,
      )}%: Preço do BTC mudou para ${newPrice}`,
    );
  }

  private reconnectToBinanceWebSocket() {
    this.socket.terminate();
    this.socket.removeAllListeners();
    this.constructor();
  }

  private auth(apiKey: string, apiSecret: string) {
    const binance = Binance({ apiKey, apiSecret });
    return binance;
  }

  getPriceUpdates(): Subject<number> {
    return this.priceSubject;
  }

  async getWallet(apiKey, apiSecret): Promise<Account> {
    const binance = this.auth(apiKey, apiSecret);
    return binance.accountInfo();
  }

  async sell({
    quantity,
    price,
    symbol,
    apiKey,
    apiSecret,
  }: ISellBinance): Promise<Order> {
    const binance = this.auth(apiKey, apiSecret);
    const transaction = binance.orderTest({
      price,
      quantity,
      side: 'SELL',
      type: OrderType.LIMIT,
      symbol,
    });

    return transaction;
  }

  async buy({
    quantity,
    price,
    symbol,
    apiKey,
    apiSecret,
  }: IBuyBinance): Promise<Order> {
    const binance = this.auth(apiKey, apiSecret);
    const transaction = binance.orderTest({
      price,
      quantity,
      side: 'BUY',
      type: OrderType.LIMIT,
      symbol,
    });

    return transaction;
  }
}
