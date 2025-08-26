import API_CONFIG from '../config/api';

/**
 * Generic API request handler with error handling and timeout
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: API_CONFIG.TIMEOUT,
  };

  const requestOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

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
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);

    if (error.name === 'AbortError') {
      return { success: false, error: 'Request timeout' };
    }

    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    };
  }
};

/**
 * Business Contact API methods
 */
export const businessContactAPI = {
  /**
   * Create a new business contact
   * @param {Object} contactData - The contact data
   * @param {string} contactData.firstName - First name
   * @param {string} contactData.lastName - Last name
   * @param {string} contactData.phoneNumber - Phone number
   * @param {string} contactData.businessName - Business name
   * @param {string} contactData.businessLocation - Business location
   * @param {string} contactData.businessSize - Business size
   * @returns {Promise<Object>} API response
   */
  create: async contactData => {
    return apiRequest(API_CONFIG.ENDPOINTS.BUSINESS_CONTACT, {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },
};

export default {
  businessContact: businessContactAPI,
};
