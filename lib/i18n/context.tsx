'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { translations, type Locale, defaultLocale } from './translations';

type TranslationsType = typeof translations.tr | typeof translations.en;

interface LanguageContextType {
  locale: Locale;
  t: TranslationsType;
  setLocale: (locale: Locale) => void;
}

/**
 * Tarayıcı dilini okuyup TR/EN döndürür.
 * navigator.language "tr", "tr-TR", "tr-CY" gibi değerler döndürür.
 * Başlangıç değeri SSR sırasında çalışmadığı için defaultLocale kullanılır,
 * sonra useEffect ile client'ta güncellenir.
 */
function detectBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return defaultLocale;
  const lang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || '';
  return lang.toLowerCase().startsWith('tr') ? 'tr' : 'en';
}

const LanguageContext = createContext<LanguageContextType>({
  locale: defaultLocale,
  t: translations[defaultLocale],
  setLocale: () => {},
});

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // SSR'da defaultLocale ile başla, client'ta tarayıcı diline göre güncelle
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const detected = detectBrowserLocale();
    setLocaleState(detected);
    document.documentElement.lang = detected;
    setHydrated(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const t = translations[locale] as TranslationsType;

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale }}>
      {/* hydration tamamlanana kadar görünürlüğü koru, flash olmaz */}
      <div style={{ visibility: hydrated ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
