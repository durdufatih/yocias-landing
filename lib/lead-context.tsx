'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const SESSION_KEY = 'yocias_lead_shown';
const AUTO_OPEN_DELAY_MS = 2500;

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

  // Sayfa açıldıktan 2.5 sn sonra otomatik aç (bu oturumda bir kez)
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setCtaButton('auto_timer');
      setIsOpen(true);
      sessionStorage.setItem(SESSION_KEY, '1');
    }, AUTO_OPEN_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

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
