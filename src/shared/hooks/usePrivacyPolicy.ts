import { useState, useCallback } from 'react';

/**
 * Custom hook for managing Privacy Policy modal functionality
 */
export const usePrivacyPolicy = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
