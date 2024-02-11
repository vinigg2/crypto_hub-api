export class WalletConfigDTO {
  id: string;
  code: string;
  available_value: number;
  quantity: number;
  active: boolean;
  token: string;
  brokerage: any;
  profile: any;
  created_at: Date;
  updated_at?: Date;
}
