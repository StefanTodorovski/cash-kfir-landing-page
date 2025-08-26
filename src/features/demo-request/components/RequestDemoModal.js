import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Building, MapPin, Users, Phone } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button';
import { useRequestDemo } from '../../../shared/hooks/useRequestDemo';
import { BUSINESS_SIZE_OPTIONS } from '../../../shared/constants/business';
import { ANIMATION_VARIANTS } from '../../../shared/constants/ui';

const FormField = ({ label, icon: Icon, error, children }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-[#1a2332] flex items-center">
      <Icon className="w-4 h-4 mr-2 text-[#00d4ff]" />
      {label}
    </label>
    {children}
    {error && (
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-red-600"
      >
        {error}
      </motion.p>
    )}
  </div>
);

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const SuccessMessage = () => (
  <motion.div {...ANIMATION_VARIANTS.fadeInUp} className="text-center py-8">
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
        <div className="w-3 h-3 bg-white rounded-full" />
      </div>
    </div>
    <h3 className="text-2xl font-bold text-[#1a2332] mb-2">Thank You!</h3>
    <p className="text-gray-600">
      We've received your request and will be in touch shortly to schedule your
      demo.
    </p>
  </motion.div>
);

const RequestDemoModal = ({ isOpen, onClose }) => {
  const {
    formData,
    handleInputChange,
    isSubmitting,
    submitStatus,
    handleSubmit,
    errors,
  } = useRequestDemo();

  const inputClassName =
    'w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent transition-all duration-200';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1a2332] to-[#0f1419] text-white p-8 relative overflow-hidden">
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
                <div>
                  <h2 className="text-3xl font-bold mb-2">Request a Demo</h2>
                  <p className="text-gray-300">
                    See how our platform can transform your financial operations
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-8">
              {submitStatus === 'success' ? (
                <SuccessMessage />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="First Name *"
                      icon={User}
                      error={errors.firstName}
                    >
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className={inputClassName}
                        placeholder="Enter your first name"
                      />
                    </FormField>

                    <FormField
                      label="Last Name *"
                      icon={User}
                      error={errors.lastName}
                    >
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className={inputClassName}
                        placeholder="Enter your last name"
                      />
                    </FormField>
                  </div>

                  {/* Phone Number */}
                  <FormField
                    label="Phone Number *"
                    icon={Phone}
                    error={errors.phoneNumber}
                  >
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      className={inputClassName}
                      placeholder="Enter your phone number"
                    />
                  </FormField>

                  {/* Business Name */}
                  <FormField
                    label="Business Name *"
                    icon={Building}
                    error={errors.businessName}
                  >
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      required
                      className={inputClassName}
                      placeholder="Enter your business name"
                    />
                  </FormField>

                  {/* Business Location */}
                  <FormField
                    label="Business Location *"
                    icon={MapPin}
                    error={errors.businessLocation}
                  >
                    <input
                      type="text"
                      name="businessLocation"
                      value={formData.businessLocation}
                      onChange={handleInputChange}
                      required
                      className={inputClassName}
                      placeholder="Enter your business location"
                    />
                  </FormField>

                  {/* Business Size */}
                  <FormField
                    label="Business Size *"
                    icon={Users}
                    error={errors.businessSize}
                  >
                    <select
                      name="businessSize"
                      value={formData.businessSize}
                      onChange={handleInputChange}
                      required
                      className={`${inputClassName} bg-white`}
                    >
                      <option value="">Select business size</option>
                      {BUSINESS_SIZE_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
                    >
                      There was an error submitting your request. Please try
                      again or contact us directly.
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="flex-1 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 px-6 py-3 h-auto text-lg rounded-xl transition-all duration-300"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      loading={isSubmitting}
                      className="flex-1 bg-[#00d4ff] hover:bg-[#00b8e6] text-[#1a2332] font-semibold px-6 py-3 h-auto text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00d4ff]/25"
                    >
                      {isSubmitting ? (
                        'Submitting...'
                      ) : (
                        <>
                          Request Demo
                          <Send className="ml-2 w-5 h-5" />
                        </>
                      )}
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

RequestDemoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RequestDemoModal;
