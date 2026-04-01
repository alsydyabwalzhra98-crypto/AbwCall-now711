export interface Transaction {
  id: string;
  type: 'recharge' | 'call' | 'withdraw' | 'transfer';
  amount: number;
  balance: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod?: string;
  createdAt: string;
  completedAt?: string;
}

export interface RechargeRequest {
  amount: number;
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer';
}

export interface WithdrawRequest {
  amount: number;
  bankAccount: string;
}
