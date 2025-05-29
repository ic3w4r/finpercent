import React, { createContext, useContext, useState, useEffect } from 'react';
import { currencies } from '../utils/currencies';

const DEFAULT_CURRENCY = currencies.find(c => c.code === 'INR')!;
const STORAGE_KEY = 'preferred_currency';

interface CurrencyContextType {
  currentCurrency: typeof DEFAULT_CURRENCY;
  updateCurrency: (currency: typeof DEFAULT_CURRENCY) => void;
  formatAmount: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currentCurrency, setCurrentCurrency] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return currencies.find(c => c.code === parsed.code) || DEFAULT_CURRENCY;
    }
    return DEFAULT_CURRENCY;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentCurrency));
  }, [currentCurrency]);

  const formatAmount = (amount: number) => {
    return amount.toLocaleString(currentCurrency.locale, {
      style: 'currency',
      currency: currentCurrency.code
    });
  };

  const updateCurrency = (newCurrency: typeof DEFAULT_CURRENCY) => {
    setCurrentCurrency(newCurrency);
  };

  return (
    <CurrencyContext.Provider value={{ currentCurrency, updateCurrency, formatAmount }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
