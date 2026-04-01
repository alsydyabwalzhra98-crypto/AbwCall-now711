import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  async setItem(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error setting item:', error);
    }
  }

  async getItem(key: string): Promise<any> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting item:', error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }

  async setToken(token: string): Promise<void> {
    await this.setItem('auth_token', token);
  }

  async getToken(): Promise<string | null> {
    return this.getItem('auth_token');
  }

  async removeToken(): Promise<void> {
    await this.removeItem('auth_token');
  }

  async setUser(user: any): Promise<void> {
    await this.setItem('user_data', user);
  }

  async getUser(): Promise<any> {
    return this.getItem('user_data');
  }

  async removeUser(): Promise<void> {
    await this.removeItem('user_data');
  }
}

export const storage = new StorageService();
