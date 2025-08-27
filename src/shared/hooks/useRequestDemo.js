import { useState, useCallback } from 'react';
import { businessContactService } from '../services/api';
import { INITIAL_FORM_DATA } from '../constants/business';

/**
 * Custom hook for managing demo request functionality
 */
export const useRequestDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
  const [errors, setErrors] = useState({});

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    setSubmitStatus(null);
    setErrors({});
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSubmitStatus(null);
    setErrors({});
  }, []);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setSubmitStatus(null);
  }, []);

  const handleInputChange = useCallback(
    e => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));

      // Clear error for this field when user starts typing
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: null,
        }));
      }
    },
    [errors]
  );

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }

    if (!formData.businessLocation.trim()) {
      newErrors.businessLocation = 'Business location is required';
    }

    if (!formData.businessSize) {
      newErrors.businessSize = 'Business size is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      setIsSubmitting(true);
      setSubmitStatus(null);

      try {
        const result = await businessContactService.create(formData);

        if (result.success) {
          setSubmitStatus('success');

          // Reset form data and errors, but keep the success status
          setFormData(INITIAL_FORM_DATA);
          setErrors({});

          // Close modal after 3 seconds to give users time to read the success message
          setTimeout(() => {
            closeModal();
          }, 3000);
        } else {
          console.error('API Error:', result.error);
          setSubmitStatus('error');
        }
      } catch (error) {
        console.error('Unexpected error submitting form:', error);
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm, resetForm, closeModal]
  );

  return {
    // Modal state
    isModalOpen,
    openModal,
    closeModal,

    // Form state
    formData,
    handleInputChange,
    resetForm,

    // Submission state
    isSubmitting,
    submitStatus,
    handleSubmit,

    // Validation
    errors,
    validateForm,
  };
};

export default useRequestDemo;
