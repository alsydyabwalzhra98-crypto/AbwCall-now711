export interface CallRecord {
  id: string;
  phoneNumber: string;
  status: 'ongoing' | 'completed' | 'missed' | 'failed';
  duration: number;
  cost: number;
  startedAt: string;
  endedAt?: string;
  createdAt: string;
}

export interface CallRate {
  country: string;
  countryCode: string;
  rate: number;
  currency: string;
}
