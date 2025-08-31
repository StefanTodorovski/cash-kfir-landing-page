import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Building, MapPin, Users, Phone } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button';
// import { useRequestDemo } from '../../../shared/hooks/useRequestDemo';
import { BUSINESS_SIZE_OPTIONS } from '../../../shared/constants/business';
import { ANIMATION_VARIANTS } from '../../../shared/constants/ui';

interface FormFieldProps {
  label: string;
  icon: React.ElementType;
  error?: string;
  children: React.ReactNode;
  fieldName?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, icon: Icon, error, children, fieldName }) => (
  <div className="space-y-1.5 sm:space-y-2">
    <label className="text-xs sm:text-sm font-medium text-[#1a2332] flex items-center">
      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-[#00d4ff] flex-shrink-0" />
      <span className="truncate">{label}</span>
    </label>
    {children}
    {error && (
      <motion.p
        id={`${fieldName}-error`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs sm:text-sm text-red-600"
        role="alert"
        aria-live="polite"
      >
        {error}
      </motion.p>
    )}
  </div>
);

const SuccessMessage = () => (
  <motion.div
    {...ANIMATION_VARIANTS.fadeInUp}
    className="text-center py-8 sm:py-12"
  >
    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full" />
      </div>
    </div>
    <h3 className="text-xl sm:text-2xl font-bold text-[#1a2332] mb-2">
      Thank You!
    </h3>
    <p className="text-gray-600 text-sm sm:text-base px-2">
      We've received your request and will be in touch shortly to schedule your
      demo.
    </p>
  </motion.div>
);

interface RequestDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  demoHook: {
    formData: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    isSubmitting: boolean;
    submitStatus: string | null;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    errors: any;
  };
}

const RequestDemoModal: React.FC<RequestDemoModalProps> = ({ isOpen, onClose, demoHook }) => {
  const {
    formData,
    handleInputChange,
    isSubmitting,
    submitStatus,
    handleSubmit,
    errors,
  } = demoHook;

  const modalRef = useRef<HTMLDivElement | null>(null);
  // Use a callback ref to support both input and button elements
  const firstFocusableNode = React.useRef<HTMLElement | null>(null);
  const firstFocusableRef = (node: HTMLElement | null) => {
    if (node) {
      firstFocusableNode.current = node;
    }
  };

  // Keyboard accessibility - ESC key and focus management
  useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }

      // Tab key focus trapping
      if (e.key === 'Tab') {
  const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements?.length) return;

  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus first input when modal opens
      setTimeout(() => {
        firstFocusableNode.current?.focus();
      }, 100);

      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  const inputClassName =
    'w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent transition-all duration-200 text-sm sm:text-base';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1a2332] to-[#0f1419] text-white p-4 sm:p-6 md:p-8 relative overflow-hidden">
              <div className="absolute inset-0">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-[#00d4ff] to-transparent rounded-full blur-2xl"
                />
              </div>

              <div className="relative flex justify-between items-start">
                <div className="flex-1 pr-2">
                  <h2
                    id="modal-title"
                    className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2"
                  >
                    Request a Demo
                  </h2>
                  <p
                    id="modal-description"
                    className="text-gray-300 text-sm sm:text-base"
                  >
                    See how our platform can transform your financial operations
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 sm:p-3 hover:bg-white/10 rounded-full transition-colors duration-200 flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close modal"
                  type="button"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-4 sm:p-6 md:p-8">
              {submitStatus === 'success' ? (
                <SuccessMessage />
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                  noValidate
                  aria-label="Request demo form"
                >
                  {/* Personal Information Section */}
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-sm font-semibold text-[#1a2332] border-b border-gray-100 pb-2 sm:hidden">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <FormField
                        label="First Name *"
                        icon={User}
                        error={errors.firstName}
                        fieldName="firstName"
                      >
                        <input
                          ref={firstFocusableRef}
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className={inputClassName}
                          placeholder="Enter your first name"
                          aria-describedby={
                            errors.firstName ? 'firstName-error' : undefined
                          }
                          aria-invalid={errors.firstName ? 'true' : 'false'}
                          autoComplete="given-name"
                        />
                      </FormField>

                      <FormField
                        label="Last Name *"
                        icon={User}
                        error={errors.lastName}
                        fieldName="lastName"
                      >
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className={inputClassName}
                          placeholder="Enter your last name"
                          aria-describedby={
                            errors.lastName ? 'lastName-error' : undefined
                          }
                          aria-invalid={errors.lastName ? 'true' : 'false'}
                          autoComplete="family-name"
                        />
                      </FormField>
                    </div>

                    <FormField
                      label="Phone Number *"
                      icon={Phone}
                      error={errors.phoneNumber}
                      fieldName="phoneNumber"
                    >
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                        className={inputClassName}
                        placeholder="Enter your phone number"
                        aria-describedby={
                          errors.phoneNumber ? 'phoneNumber-error' : undefined
                        }
                        aria-invalid={errors.phoneNumber ? 'true' : 'false'}
                        autoComplete="tel"
                      />
                    </FormField>
                  </div>

                  {/* Business Information Section */}
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-sm font-semibold text-[#1a2332] border-b border-gray-100 pb-2 sm:hidden">
                      Business Information
                    </h3>

                    <FormField
                      label="Business Name *"
                      icon={Building}
                      error={errors.businessName}
                      fieldName="businessName"
                    >
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        required
                        className={inputClassName}
                        placeholder="Enter your business name"
                        aria-describedby={
                          errors.businessName ? 'businessName-error' : undefined
                        }
                        aria-invalid={errors.businessName ? 'true' : 'false'}
                        autoComplete="organization"
                      />
                    </FormField>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <FormField
                        label="Business Location *"
                        icon={MapPin}
                        error={errors.businessLocation}
                        fieldName="businessLocation"
                      >
                        <input
                          type="text"
                          name="businessLocation"
                          value={formData.businessLocation}
                          onChange={handleInputChange}
                          required
                          className={inputClassName}
                          placeholder="City, Country"
                          aria-describedby={
                            errors.businessLocation
                              ? 'businessLocation-error'
                              : undefined
                          }
                          aria-invalid={
                            errors.businessLocation ? 'true' : 'false'
                          }
                          autoComplete="address-level2"
                        />
                      </FormField>

                      <FormField
                        label="Business Size *"
                        icon={Users}
                        error={errors.businessSize}
                        fieldName="businessSize"
                      >
                        <select
                          name="businessSize"
                          value={formData.businessSize}
                          onChange={handleInputChange}
                          required
                          className={`${inputClassName} bg-white`}
                          aria-describedby={
                            errors.businessSize
                              ? 'businessSize-error'
                              : undefined
                          }
                          aria-invalid={errors.businessSize ? 'true' : 'false'}
                        >
                          <option value="">Select business size</option>
                          {BUSINESS_SIZE_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </FormField>
                    </div>
                  </div>

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <motion.div
                      id="submit-error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl text-red-700 text-sm"
                      role="alert"
                      aria-live="assertive"
                    >
                      <strong>Error:</strong> There was an error submitting your
                      request. Please try again or contact us directly.
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="flex-1 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-3 sm:px-6 sm:py-3 h-auto min-h-[48px] text-base sm:text-lg rounded-lg sm:rounded-xl transition-all duration-300"
                      aria-label="Cancel and close modal"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      loading={isSubmitting}
                      className="flex-1 bg-[#00d4ff] hover:bg-[#00b8e6] text-[#1a2332] font-semibold px-4 py-3 sm:px-6 sm:py-3 h-auto min-h-[48px] text-base sm:text-lg rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00d4ff]/25 focus:ring-2 focus:ring-[#00d4ff] focus:ring-offset-2"
                      disabled={isSubmitting}
                      aria-describedby={
                        submitStatus === 'error' ? 'submit-error' : undefined
                      }
                    >
                      <span className="hidden sm:inline">Request Demo</span>
                      <span className="sm:hidden">Request Demo</span>
                      <Send className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};



export default RequestDemoModal;
