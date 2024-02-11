export enum TypeTransaction {
  BUY = 'BUY',
  SELL = 'SELL',
}
export class TransactionDTO {
  id: string;
  profile: any;
  wallet: any;
  type: TypeTransaction;
  quantity: number;
  price: number;
  transaction_date: Date;
  earned_value: number;
  earned_quantity: number;
  status: string;
  order_id: string;
  client_order_id: string;
  request: any;
  count: number;
  created_at: Date;
  updated_at?: Date;
}
