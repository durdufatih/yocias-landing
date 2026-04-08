'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface LeadModalContextType {
  isOpen: boolean;
  ctaButton: string;
  openModal: (ctaButton: string) => void;
  closeModal: () => void;
}

const LeadModalContext = createContext<LeadModalContextType>({
  isOpen: false,
  ctaButton: '',
  openModal: () => {},
  closeModal: () => {},
});

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [ctaButton, setCtaButton] = useState('');

  const openModal = useCallback((button: string) => {
    setCtaButton(button);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <LeadModalContext.Provider value={{ isOpen, ctaButton, openModal, closeModal }}>
      {children}
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  return useContext(LeadModalContext);
}
