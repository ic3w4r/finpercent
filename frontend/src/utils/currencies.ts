interface Currency {
  code: string;
  name: string;
  symbol: string;
  locale: string;
}

export const currencies: Currency[] = [
  {
    code: 'INR',
    name: 'Indian Rupee',
    symbol: '₹',
    locale: 'en-IN'
  },
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    locale: 'en-US'
  },
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    locale: 'en-EU'
  },
  {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    locale: 'en-GB'
  },
  {
    code: 'JPY',
    name: 'Japanese Yen',
    symbol: '¥',
    locale: 'ja-JP'
  },
  {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: 'A$',
    locale: 'en-AU'
  },
  {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'C$',
    locale: 'en-CA'
  },
  {
    code: 'SGD',
    name: 'Singapore Dollar',
    symbol: 'S$',
    locale: 'en-SG'
  },
  {
    code: 'CNY',
    name: 'Chinese Yuan',
    symbol: '¥',
    locale: 'zh-CN'
  },
  {
    code: 'AED',
    name: 'UAE Dirham',
    symbol: 'د.إ',
    locale: 'ar-AE'
  }
];
