export interface CallRecord {
  id: string;
  phoneNumber: string;
  status: 'ongoing' | 'completed' | 'missed' | 'failed';
  duration: number; // in seconds
  cost: number;
  startedAt: string;
  endedAt?: string;
  createdAt: string;
}

export interface CallRate {
  country: string;
  countryCode: string;
  rate: number; // per minute
  currency: string;
}

export interface CallRequest {
  phoneNumber: string;
}
