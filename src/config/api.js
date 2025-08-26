// API Configuration
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:42000',
  ENDPOINTS: {
    BUSINESS_CONTACT: '/api/BusinessContact',
  },
  TIMEOUT: 10000, // 10 seconds
};

export default API_CONFIG;
