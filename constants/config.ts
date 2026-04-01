export const CONFIG = {
  // API Configuration
  API_BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api',
  API_TIMEOUT: 10000,
  
  // WebSocket Configuration
  WEBSOCKET_URL: process.env.EXPO_PUBLIC_WEBSOCKET_URL || 'ws://localhost:8000/ws',
  
  // Twilio Configuration
  TWILIO_ACCOUNT_SID: process.env.EXPO_PUBLIC_TWILIO_ACCOUNT_SID || '',
  TWILIO_AUTH_TOKEN: process.env.EXPO_PUBLIC_TWILIO_AUTH_TOKEN || '',
  TWILIO_PHONE_NUMBER: process.env.EXPO_PUBLIC_TWILIO_PHONE_NUMBER || '',
  
  // App Configuration
  APP_NAME: 'أبو الزهرا للاتصالات',
  APP_VERSION: '1.0.0',
  
  // UI Configuration
  DEFAULT_ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  
  // Call Configuration
  MAX_CALL_DURATION: 7200, // 2 hours in seconds
  CALL_RETRY_ATTEMPTS: 3,
  CALL_RETRY_DELAY: 1000,
  
  // Storage Configuration
  STORAGE_KEYS: {
    AUTH_TOKEN: 'auth_token',
    USER_DATA: 'user_data',
    CALL_HISTORY: 'call_history',
    CONTACTS: 'contacts',
    SETTINGS: 'app_settings',
  },
  
  // Validation Rules
  VALIDATION: {
    MIN_PASSWORD_LENGTH: 8,
    MAX_PHONE_LENGTH: 15,
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 50,
  },
  
  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
  },
};
