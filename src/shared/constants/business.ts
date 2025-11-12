export const BUSINESS_SIZE_OPTIONS = [
  { value: 'startup', label: 'Startup (1-10 employees)' },
  { value: 'small', label: 'Small (11-50 employees)' },
  { value: 'medium', label: 'Medium (51-200 employees)' },
  { value: 'large', label: 'Large (201-1000 employees)' },
  { value: 'enterprise', label: 'Enterprise (1000+ employees)' },
];

export const INITIAL_FORM_DATA = {
  firstName: '',
  lastName: '',
  email: '',
  businessName: '',
  businessLocation: '',
  businessSize: '',
  expectedBanks: '', // store as string for input, convert to number on submit
};
