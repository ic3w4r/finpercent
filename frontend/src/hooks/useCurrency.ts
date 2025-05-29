import { useState, useEffect } from 'react';
import { currencies } from '../utils/currencies';

const DEFAULT_CURRENCY = currencies.find(c => c.code === 'INR')!;
const STORAGE_KEY = 'preferred_currency';

export function useCurrency() {
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

  return {
    currentCurrency,
    updateCurrency,
    formatAmount
  };
}
