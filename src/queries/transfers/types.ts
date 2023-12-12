export interface Transfer {
  id: number;
  from_account: {
    id: number;
    agencia: string;
    numero: string;
  };
  to_account_id: number;
  to_account: {
    id: number;
    agencia: string;
    numero: string;
  };
  value: number;
  created_at: string;
}
