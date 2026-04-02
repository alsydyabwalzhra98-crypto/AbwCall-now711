import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/auth';

interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  language: 'ar' | 'en';
  notifications: boolean;
  setUser: (user: User | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'ar' | 'en') => void;
  setNotifications: (enabled: boolean) => void;
  clearStore: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      theme: 'light',
      language: 'ar',
      notifications: true,

      setUser: (user) => set({ user }),

      setTheme: (theme) => set({ theme }),

      setLanguage: (language) => set({ language }),

      setNotifications: (notifications) => set({ notifications }),

      clearStore: () => set({
        user: null,
        theme: 'light',
        language: 'ar',
        notifications: true,
      }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
