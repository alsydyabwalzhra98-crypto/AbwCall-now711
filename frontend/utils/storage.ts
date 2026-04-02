import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG } from '../constants/config';
import { User } from '../types/auth';

class StorageService {
  private async setItem(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error storing ${key}:`, error);
      throw error;
    }
  }

  private async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error retrieving ${key}:`, error);
      return null;
    }
  }

  private async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      throw error;
    }
  }

  // Auth token methods
  async getToken(): Promise<string | null> {
    return this.getItem<string>(CONFIG.STORAGE_KEYS.AUTH_TOKEN);
  }

  async setToken(token: string): Promise<void> {
    return this.setItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN, token);
  }

  async removeToken(): Promise<void> {
    return this.removeItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN);
  }

  // User data methods
  async getUser(): Promise<User | null> {
    return this.getItem<User>(CONFIG.STORAGE_KEYS.USER_DATA);
  }

  async setUser(user: User): Promise<void> {
    return this.setItem(CONFIG.STORAGE_KEYS.USER_DATA, user);
  }

  async removeUser(): Promise<void> {
    return this.removeItem(CONFIG.STORAGE_KEYS.USER_DATA);
  }

  // Settings methods
  async getSettings(): Promise<any> {
    return this.getItem(CONFIG.STORAGE_KEYS.SETTINGS) || {};
  }

  async setSettings(settings: any): Promise<void> {
    return this.setItem(CONFIG.STORAGE_KEYS.SETTINGS, settings);
  }

  // Clear all data
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  // Get all keys
  async getAllKeys(): Promise<string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  }
}

export const storage = new StorageService();
