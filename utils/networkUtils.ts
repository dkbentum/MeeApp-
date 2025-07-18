import { getApiUrl } from '@/constants/Config';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}

export class NetworkError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

export const apiCall = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const url = getApiUrl(endpoint);
    console.log(`🌐 Making API call to: ${url}`);
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    console.log(`📡 Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ API Error ${response.status}:`, errorText);
      
      throw new NetworkError(
        `HTTP ${response.status}: ${errorText}`,
        response.status,
        errorText
      );
    }

    const data = await response.json();
    console.log(`✅ API call successful:`, data);
    
    return {
      success: true,
      data,
      status: response.status,
    };
  } catch (error) {
    console.error(`💥 Network error for ${endpoint}:`, error);
    
    if (error instanceof NetworkError) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown network error',
    };
  }
};

export const apiCallWithAuth = async <T = any>(
  endpoint: string,
  token: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  return apiCall<T>(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  });
};

// Helper function to check if backend is reachable
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(getApiUrl('/actuator/health'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.ok;
  } catch (error) {
    console.log('Backend health check failed:', error);
    return false;
  }
};

// Helper function to get network info for debugging
export const getNetworkInfo = () => {
  return {
    apiBaseUrl: getApiUrl(''),
    isDev: __DEV__,
    platform: require('react-native').Platform.OS,
  };
}; 