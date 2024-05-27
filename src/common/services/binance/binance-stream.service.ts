import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';
import { Subject } from 'rxjs';
import { app } from '@config/app';
import { IPriceSubject } from '@src/common/services/binance/binance.interface';

@Injectable()
export class BinanceStreamService {
  private readonly binanceWebSocketUrl = app.binance.stream_url;
  private readonly socket: WebSocket;
  private readonly priceSubject: Subject<IPriceSubject> = new Subject<IPriceSubject>();
  private previousPrice: number;

  constructor() {
    this.socket = new WebSocket(this.binanceWebSocketUrl);

    this.socket.on('message', (data: string) => {
      try {
        const parsedData = JSON.parse(data);
        const price = parseFloat(parsedData.p);
        this.handlePriceChange(price);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
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
      if (Math.abs(variationPercentage) > 0.001) {
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
    this.priceSubject.next({
      price: newPrice,
      variation: variationPercentage,
    });
  }

  private reconnectToBinanceWebSocket() {
    this.socket.terminate();
    this.socket.removeAllListeners();
    setTimeout(() => this.constructor(), 5000);
  }

  getPriceUpdates(): Subject<IPriceSubject> {
    return this.priceSubject;
  }

  unsubscribe() {
    this.socket.close();
  }
}
