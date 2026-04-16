'use client';
import { createContext, useContext, useState, useCallback } from 'react';
import { translations } from '@/data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const L = useCallback((key) => {
    return translations[key]?.[lang] || key;
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'cz' ? 'en' : 'cz'));
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, L }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLang must be used within LanguageProvider');
  return context;
}
