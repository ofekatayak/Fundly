// src/context/ModalContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextProps {
  isModalOpen: boolean;
  openModal: (type: string) => void;
  closeModal: () => void;
  setModalType: (type: string) => void;
  modalType: string;
  userType: string;
  setUserType: (type: string) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Sign Up As');
  const [userType, setUserType] = useState('Investor');


  const openModal = (type: string) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('');
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        modalType,
        setModalType,
        userType,
        setUserType,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
