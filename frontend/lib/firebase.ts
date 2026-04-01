import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getDatabase, Database } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '',
  databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL || '',
};

class FirebaseService {
  private app: any;
  private auth: Auth | null = null;
  private database: Database | null = null;

  constructor() {
    try {
      this.app = initializeApp(firebaseConfig);
      this.auth = getAuth(this.app);
      this.database = getDatabase(this.app);
    } catch (error) {
      console.error('Firebase initialization error:', error);
    }
  }

  getAuth(): Auth | null {
    return this.auth;
  }

  getDatabase(): Database | null {
    return this.database;
  }

  isInitialized(): boolean {
    return this.auth !== null && this.database !== null;
  }
}

export const firebaseService = new FirebaseService();
