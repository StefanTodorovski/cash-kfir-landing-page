
import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { businessContactService } from '../services/api';
import { INITIAL_FORM_DATA } from '../constants/business';
import { analyticsService } from '../services/analytics';

export type DemoFormData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  businessName: string;
  businessLocation: string;
  businessSize: string;
};

export type DemoFormErrors = Partial<Record<keyof DemoFormData, string>>;

/**
 * Custom hook for managing demo request functionality
 */

export const useRequestDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<DemoFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errors, setErrors] = useState<DemoFormErrors>({});

  const openModal = useCallback(() => {
    analyticsService.logEvent('demo_modal_opened', {
      event_category: 'engagement',
      event_label: 'modal_interaction',
    });
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
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));

      // Clear error for this field when user starts typing
      if (errors[name as keyof DemoFormErrors]) {
        setErrors(prev => ({
          ...prev,
          [name]: undefined,
        }));
      }
    },
    [errors]
  );

  const validateForm = useCallback(() => {
    const newErrors: DemoFormErrors = {};

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
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      setIsSubmitting(true);
      setSubmitStatus(null);

      try {
        const result = await businessContactService.create(formData);

        if (result.success) {
          // Track successful demo request
          analyticsService.trackDemoRequest(formData);
          
          setSubmitStatus('success');

          // Reset form data and errors, but keep the success status
          setFormData(INITIAL_FORM_DATA);
          setErrors({});

          // Close modal after 3 seconds to give users time to read the success message
          setTimeout(() => {
            closeModal();
          }, 3000);
        } else {
          // Track failed demo request
          analyticsService.logEvent('demo_request_failed', {
            event_category: 'form_submission',
            event_label: 'api_error',
            error_message: result.error || 'unknown_error',
          });
          console.error('API Error:', result.error);
          setSubmitStatus('error');
        }
      } catch (error) {
        // Track unexpected errors
        analyticsService.logEvent('demo_request_error', {
          event_category: 'form_submission',
          event_label: 'unexpected_error',
          error_message: error instanceof Error ? error.message : 'unknown_error',
        });
        console.error('Unexpected error submitting form:', error);
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm, closeModal]
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
