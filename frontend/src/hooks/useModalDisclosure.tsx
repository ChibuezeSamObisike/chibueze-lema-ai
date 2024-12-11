import { useState } from 'react';

export const useModalDisclosure = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return {
    isOpen: isModalOpen,
    openModal,
    closeModal,
  };
};
