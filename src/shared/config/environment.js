export const ENV = {
  API_URL:
    process.env.NODE_ENV === 'production'
      ? 'https://api.morningful.ai'
      : 'http://localhost:42000',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
};

export const API_CONFIG = {
  BASE_URL: ENV.API_URL,
  ENDPOINTS: {
    BUSINESS_CONTACT: '/api/BusinessContact',
  },
};

export const APP_CONFIG = {
  APP_NAME: 'Morningful AI',
  COMPANY_NAME: 'Morningful AI',
  COPYRIGHT_YEAR: new Date().getFullYear(),
  SOCIAL_LINKS: {
    FACEBOOK: '#',
    TWITTER: '#',
    LINKEDIN: '#',
  },
};
