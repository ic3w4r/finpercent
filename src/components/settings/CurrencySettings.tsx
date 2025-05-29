import React from 'react';
import { DollarSign } from 'lucide-react';
import { currencies } from '../../utils/currencies';
import { useCurrency } from '../../hooks/useCurrency';

export default function CurrencySettings() {
  const { currentCurrency, updateCurrency } = useCurrency();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Currency Preferences</h2>
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-primary-50 rounded-full">
            <DollarSign className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-medium">Display Currency</h3>
            <p className="text-sm text-gray-600">Choose your preferred currency</p>
          </div>
        </div>

        <div className="space-y-4">
          <select
            value={currentCurrency.code}
            onChange={(e) => {
              const selected = currencies.find(c => c.code === e.target.value);
              if (selected) updateCurrency(selected);
            }}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.name} ({currency.symbol} - {currency.code})
              </option>
            ))}
          </select>

          <div className="p-4 bg-primary-50 rounded-lg">
            <h4 className="font-medium mb-2">Current Format Example:</h4>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Symbol: <span className="font-medium text-gray-900">{currentCurrency.symbol}</span>
              </p>
              <p className="text-sm text-gray-600">
                Example: <span className="font-medium text-gray-900">
                  {currentCurrency.symbol} {(1234.56).toLocaleString(currentCurrency.locale, {
                    style: 'currency',
                    currency: currentCurrency.code
                  })}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
