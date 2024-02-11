import { TypeTransaction } from './transaction.dtos';

export class CreateTransactionDTO {
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
}
