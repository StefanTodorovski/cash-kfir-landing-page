import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Building, MapPin, Users, Phone } from 'lucide-react';
import { Button } from './button';

export default function RequestDemoModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    businessName: '',
    businessLocation: '',
    businessSize: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

  const businessSizeOptions = [
    { value: 'startup', label: 'Startup (1-10 employees)' },
    { value: 'small', label: 'Small (11-50 employees)' },
    { value: 'medium', label: 'Medium (51-200 employees)' },
    { value: 'large', label: 'Large (201-1000 employees)' },
    { value: 'enterprise', label: 'Enterprise (1000+ employees)' },
  ];

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        'http://localhost:42000/api/BusinessContact',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          phoneNumber: '',
          businessName: '',
          businessLocation: '',
          businessSize: '',
        });
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#1a2332] mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600">
                    We've received your request and will be in touch shortly to
                    schedule your demo.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#1a2332] flex items-center">
                        <User className="w-4 h-4 mr-2 text-[#00d4ff]" />
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent transition-all duration-200"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#1a2332] flex items-center">
                        <User className="w-4 h-4 mr-2 text-[#00d4ff]" />
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent transition-all duration-200"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1a2332] flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-[#00d4ff]" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent transition-all duration-200"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Business Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1a2332] flex items-center">
                      <Building className="w-4 h-4 mr-2 text-[#00d4ff]" />
                      Business Name *
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent transition-all duration-200"
                      placeholder="Enter your business name"
                    />
                  </div>

                  {/* Business Location */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1a2332] flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-[#00d4ff]" />
                      Business Location *
                    </label>
                    <input
                      type="text"
                      name="businessLocation"
                      value={formData.businessLocation}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent transition-all duration-200"
                      placeholder="Enter your business location"
                    />
                  </div>

                  {/* Business Size */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1a2332] flex items-center">
                      <Users className="w-4 h-4 mr-2 text-[#00d4ff]" />
                      Business Size *
                    </label>
                    <select
                      name="businessSize"
                      value={formData.businessSize}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent transition-all duration-200 bg-white"
                    >
                      <option value="">Select business size</option>
                      {businessSizeOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

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
                      disabled={isSubmitting}
                      className="flex-1 bg-[#00d4ff] hover:bg-[#00b8e6] text-[#1a2332] font-semibold px-6 py-3 h-auto text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00d4ff]/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="w-5 h-5 border-2 border-[#1a2332] border-t-transparent rounded-full animate-spin mr-2" />
                          Submitting...
                        </div>
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
}
