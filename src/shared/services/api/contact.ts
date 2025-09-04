import { API_CONFIG } from '../../config/environment';

/**
 * Simple API request handler for contact requests
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

    // Handle response - some endpoints might return empty body or non-JSON
    let data = null;
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      try {
        data = await response.json();
      } catch (jsonError) {
        // If JSON parsing fails, log it but don't fail the request
        console.warn('Failed to parse JSON response:', jsonError);
      }
    }

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
 * Contact API service
 */
export type ContactData = {
  name: string;
  email: string;
  message: string;
};

export const contactService = {
  async create(contactData: ContactData) {
    // Simple validation
    const requiredFields: (keyof ContactData)[] = ['name', 'email', 'message'];
    const missingFields = requiredFields.filter(field => !contactData[field]);

    if (missingFields.length > 0) {
      return {
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`,
        status: 400,
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      return {
        success: false,
        error: 'Invalid email format',
        status: 400,
      };
    }

    return apiRequest('/api/BusinessContact/contact-sales', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },
};

export default contactService;
