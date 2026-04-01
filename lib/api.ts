import axios, { AxiosInstance } from 'axios';
import { storage } from '../utils/storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api';

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
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          await storage.removeToken();
          await storage.removeUser();
        }
        return Promise.reject(error);
      }
    );
  }

  async get(url: string, params?: any) {
    return this.client.get(url, { params });
  }

  async post(url: string, data?: any) {
    return this.client.post(url, data);
  }

  async put(url: string, data?: any) {
    return this.client.put(url, data);
  }

  async delete(url: string) {
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
};

export const callAPI = {
  makeCall: (phoneNumber: string) =>
    apiClient.post('/calls/make', { phone_number: phoneNumber }),
  endCall: (callId: string) =>
    apiClient.post(`/calls/${callId}/end`),
  getCallHistory: () => apiClient.get('/calls/history'),
};

export const contactAPI = {
  getContacts: () => apiClient.get('/contacts'),
  addContact: (name: string, phone: string) =>
    apiClient.post('/contacts', { name, phone }),
  deleteContact: (id: string) => apiClient.delete(`/contacts/${id}`),
};
