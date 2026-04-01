import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { storage } from '../utils/storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://abualzahracom.online:8000/api';

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      async (config) => {
        const token = await storage.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        if (error.response?.status === 401) {
          await storage.removeToken();
          await storage.removeUser();
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, params?: any): Promise<AxiosResponse<T>> {
    return this.client.get(url, { params });
  }

  async post<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.client.post(url, data);
  }

  async put<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.client.put(url, data);
  }

  async delete<T>(url: string): Promise<AxiosResponse<T>> {
    return this.client.delete(url);
  }
}

export const apiClient = new APIClient();

export const authAPI = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  signup: (name: string, email: string, password: string) =>
    apiClient.post('/auth/signup', { name, email, password }),
  getProfile: () => apiClient.get('/auth/me'),
  updateProfile: (data: any) => apiClient.put('/auth/profile', data),
};

export const callAPI = {
  makeCall: (phoneNumber: string) =>
    apiClient.post('/calls/make', { phone_number: phoneNumber }),
  endCall: (callId: string) =>
    apiClient.post(`/calls/${callId}/end`),
  getCallHistory: () => apiClient.get('/calls/history'),
  getCallRates: () => apiClient.get('/calls/rates'),
};

export const contactAPI = {
  getContacts: () => apiClient.get('/contacts'),
  addContact: (name: string, phone: string) =>
    apiClient.post('/contacts', { name, phone }),
  updateContact: (id: string, data: any) =>
    apiClient.put(`/contacts/${id}`, data),
  deleteContact: (id: string) => apiClient.delete(`/contacts/${id}`),
  searchContacts: (query: string) =>
    apiClient.get('/contacts/search', { q: query }),
};

export const transactionAPI = {
  getTransactions: () => apiClient.get('/transactions'),
  recharge: (amount: number, paymentMethod: string) =>
    apiClient.post('/transactions/recharge', { amount, payment_method: paymentMethod }),
  withdraw: (amount: number) =>
    apiClient.post('/transactions/withdraw', { amount }),
};

export const messageAPI = {
  getMessages: () => apiClient.get('/messages'),
  sendMessage: (content: string, type: 'text' | 'image' | 'file') =>
    apiClient.post('/messages', { content, type }),
  deleteMessage: (id: string) => apiClient.delete(`/messages/${id}`),
};
