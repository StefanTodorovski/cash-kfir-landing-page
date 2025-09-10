import { API_CONFIG } from '../../config/environment';

/**
 * Simple API request handler for beta waitlist requests
 */
const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: any; error?: string }> => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const requestOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers as Record<string, string>),
    },
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds

    const response = await fetch(url, {
      ...requestOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error: unknown) {
    console.error(`API request failed for ${endpoint}:`, error);

    if (error instanceof Error && error.name === 'AbortError') {
      return { success: false, error: 'Request timeout' };
    }

    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};

/**
 * Beta Waitlist API service
 */
export type BetaWaitlistData = {
  firstName: string;
  lastName: string;
  email: string;
  businessName: string;
  businessLocation: string;
  businessSize: string;
};

export const betaWaitlistService = {
  async joinWaitlist(waitlistData: BetaWaitlistData) {
    // Simple validation
    const requiredFields: (keyof BetaWaitlistData)[] = [
      'firstName',
      'lastName',
      'email',
      'businessName',
      'businessLocation',
      'businessSize',
    ];
    const missingFields = requiredFields.filter(field => !waitlistData[field]);

    if (missingFields.length > 0) {
      return {
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`,
        status: 400,
      };
    }

    return apiRequest('/api/BusinessContact/join-beta-waitlist', {
      method: 'POST',
      body: JSON.stringify(waitlistData),
    });
  },
};

export default betaWaitlistService;
