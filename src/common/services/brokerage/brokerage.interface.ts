export interface IBrokerageDataService {
  getWallet(): Promise<any>;
  sell(data: any): Promise<any>;
  buy(data: any): Promise<any>;
}

export interface IBrokerageService {
  getBrokerageService(
    bokerName: string,
    apiKey: string,
    apiSecret: string,
  ): IBrokerageDataService;
}
