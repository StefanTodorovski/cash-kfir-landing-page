import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { betaWaitlistService } from '../services/api';
import { INITIAL_FORM_DATA } from '../constants/business';
import { analyticsService } from '../services/analytics';

export type BetaWaitlistFormData = {
  firstName: string;
  lastName: string;
  email: string;
  businessName: string;
  businessLocation: string;
  businessSize: string;
  expectedBanks: string; // store as string for input, convert to number on submit
};

export type BetaWaitlistFormErrors = Partial<
  Record<keyof BetaWaitlistFormData, string>
>;

/**
 * Custom hook for managing beta waitlist functionality
 */
export const useBetaWaitlist = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] =
    useState<BetaWaitlistFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(
    null
  );
  const [errors, setErrors] = useState<BetaWaitlistFormErrors>({});

  const openModal = useCallback(() => {
    analyticsService.logEvent('beta_modal_opened', {
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
      if (errors[name as keyof BetaWaitlistFormErrors]) {
        setErrors(prev => ({
          ...prev,
          [name]: undefined,
        }));
      }
    },
    [errors]
  );

  const validateForm = useCallback(() => {
    const newErrors: BetaWaitlistFormErrors = {};

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

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
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

    if (!formData.expectedBanks.trim()) {
      newErrors.expectedBanks = 'Expected banks is required';
    } else if (isNaN(Number(formData.expectedBanks)) || Number(formData.expectedBanks) <= 0) {
      newErrors.expectedBanks = 'Please enter a valid number greater than 0';
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

        // Convert expectedBanks to number before sending
        const submitData = {
          ...formData,
          expectedBanks: Number(formData.expectedBanks),
        };
        const result = await betaWaitlistService.joinWaitlist(submitData);

        if (result.success) {
          // Track successful beta waitlist request
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
          // Track failed beta waitlist request
          analyticsService.logEvent('beta_request_failed', {
            event_category: 'form_submission',
            event_label: 'api_error',
            error_message: result.error || 'unknown_error',
          });
          console.error('API Error:', result.error);
          setSubmitStatus('error');
        }
      } catch (error) {
        // Track unexpected errors
        analyticsService.logEvent('beta_request_error', {
          event_category: 'form_submission',
          event_label: 'unexpected_error',
          error_message:
            error instanceof Error ? error.message : 'unknown_error',
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

export default useBetaWaitlist;
