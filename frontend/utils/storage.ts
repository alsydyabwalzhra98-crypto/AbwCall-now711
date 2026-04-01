import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG } from '../constants/config';
import { User } from '../types/auth';

class StorageService {
  async setToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN, token);
    } catch (error) {
      console.error('Error setting token:', error);
    }
  }

  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }

  async setUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(user));
    } catch (error) {
      console.error('Error setting user:', error);
    }
  }

  async getUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(CONFIG.STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  async removeUser(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CONFIG.STORAGE_KEYS.USER_DATA);
    } catch (error) {
      console.error('Error removing user:', error);
    }
  }

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(Object.values(CONFIG.STORAGE_KEYS));
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}

export const storage = new StorageService();
