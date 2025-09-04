import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { contactService } from '../services/api';

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const INITIAL_CONTACT_FORM_DATA: ContactFormData = {
  name: '',
  email: '',
  message: '',
};

/**
 * Custom hook for managing contact form functionality
 */
export const useContact = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<ContactFormData>(
    INITIAL_CONTACT_FORM_DATA
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(
    null
  );
  const [errors, setErrors] = useState<ContactFormErrors>({});

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
    setFormData(INITIAL_CONTACT_FORM_DATA);
    setErrors({});
    setSubmitStatus(null);
  }, []);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));

      // Clear error for this field when user starts typing
      if (errors[name as keyof ContactFormErrors]) {
        setErrors(prev => ({
          ...prev,
          [name]: undefined,
        }));
      }
    },
    [errors]
  );

  const validateForm = useCallback(() => {
    const newErrors: ContactFormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
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

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
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
        const result = await contactService.create(formData);

        if (result.success) {
          setSubmitStatus('success');

          // Reset form data and errors, but keep the success status
          setFormData(INITIAL_CONTACT_FORM_DATA);
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

export default useContact;
