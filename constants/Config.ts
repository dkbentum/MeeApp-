import { Platform } from 'react-native';

// Configuration for different environments
export const Config = {
  // Development - use your computer's IP address when running on device/emulator
  // For Android emulator, use 10.0.2.2 instead of localhost
  // For iOS simulator, localhost works fine
  // For physical device, use your computer's IP address (e.g., 192.168.1.100)
  
  // Change this to your computer's IP address when testing on device/emulator
  API_BASE_URL: __DEV__ 
    ? 'http://10.0.2.2:8080'  // Android emulator
    : 'http://localhost:8080', // iOS simulator or web
  
  // Alternative URLs for different scenarios:
  // For physical device testing: 'http://192.168.1.100:8080' (replace with your IP)
  // For production: 'https://your-production-domain.com'
  
  // API endpoints
  ENDPOINTS: {
    AUTH: {
      SIGNIN: '/api/auth/signin',
      SIGNUP: '/api/auth/signup',
    },
    MESSAGES: {
      CONVERSATIONS: '/api/messages/conversations',
      CONVERSATION_MESSAGES: (id: number) => `/api/messages/conversations/${id}`,
      MARK_READ: (id: number) => `/api/messages/${id}/read`,
    },
  },
  
  // Timeout settings
  REQUEST_TIMEOUT: 10000, // 10 seconds
  
  // Retry settings
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${Config.API_BASE_URL}${endpoint}`;
};

// Helper function to check if running on Android emulator
export const isAndroidEmulator = (): boolean => {
  return __DEV__ && Platform.OS === 'android';
};

// Helper function to check if running on iOS simulator
export const isIosSimulator = (): boolean => {
  return __DEV__ && Platform.OS === 'ios';
};

// Helper function to get the correct localhost URL based on platform
export const getLocalhostUrl = (): string => {
  if (isAndroidEmulator()) {
    return 'http://10.0.2.2:8080';
  } else if (isIosSimulator()) {
    return 'http://localhost:8080';
  } else {
    // For web or other platforms
    return 'http://localhost:8080';
  }
}; 