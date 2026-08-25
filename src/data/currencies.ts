export type Currency = {
  code: string;
  name: string;
  symbol: string;
  // Units of this currency per 1 USD (approximate reference rates).
  perUsd: number;
};

// Approximate reference exchange rates. These are baseline estimates used for
// planning and will not exactly match live market rates.
export const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', perUsd: 1 },
  { code: 'EUR', name: 'Euro', symbol: '\u20AC', perUsd: 0.92 },
  { code: 'GBP', name: 'British Pound', symbol: '\u00A3', perUsd: 0.79 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '\u00A5', perUsd: 152 },
  { code: 'CNY', name: 'Chinese Yuan (Renminbi)', symbol: '\u00A5', perUsd: 7.2 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', perUsd: 1.52 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', perUsd: 1.37 },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', perUsd: 0.88 },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', perUsd: 7.8 },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', perUsd: 1.35 },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', perUsd: 1.65 },
  { code: 'INR', name: 'Indian Rupee', symbol: '\u20B9', perUsd: 83 },
  { code: 'KRW', name: 'South Korean Won', symbol: '\u20A9', perUsd: 1350 },
  { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$', perUsd: 32 },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED', perUsd: 3.67 },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'SAR', perUsd: 3.75 },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', perUsd: 18.5 },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', perUsd: 5.1 },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$', perUsd: 17.5 },
  { code: 'RUB', name: 'Russian Ruble', symbol: '\u20BD', perUsd: 92 },
  { code: 'TRY', name: 'Turkish Lira', symbol: '\u20BA', perUsd: 32 },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', perUsd: 10.5 },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', perUsd: 10.7 },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', perUsd: 6.9 },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'z\u0142', perUsd: 3.95 },
  { code: 'THB', name: 'Thai Baht', symbol: '\u0E3F', perUsd: 35 },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', perUsd: 4.7 },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', perUsd: 15800 },
  { code: 'PHP', name: 'Philippine Peso', symbol: '\u20B1', perUsd: 57 },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '\u20AB', perUsd: 25000 },
  { code: 'KHR', name: 'Cambodian Riel', symbol: '\u17DB', perUsd: 4100 },
  { code: 'LAK', name: 'Lao Kip', symbol: '\u20AD', perUsd: 21000 },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'K\u010D', perUsd: 23 },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', perUsd: 360 },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei', perUsd: 4.6 },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'lv', perUsd: 1.8 },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '\u20AA', perUsd: 3.7 },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E\u00A3', perUsd: 48 },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'MAD', perUsd: 10 },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '\u20A6', perUsd: 1500 },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', perUsd: 135 },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: 'Rs', perUsd: 278 },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '\u09F3', perUsd: 110 },
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs', perUsd: 300 },
  { code: 'NPR', name: 'Nepalese Rupee', symbol: 'Rs', perUsd: 133 },
  { code: 'COP', name: 'Colombian Peso', symbol: 'Col$', perUsd: 3900 },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', perUsd: 3.75 },
  { code: 'CLP', name: 'Chilean Peso', symbol: 'CLP$', perUsd: 950 },
  { code: 'ARS', name: 'Argentine Peso', symbol: 'AR$', perUsd: 850 },
  { code: 'UYU', name: 'Uruguayan Peso', symbol: '$U', perUsd: 39 },
  { code: 'GTQ', name: 'Guatemalan Quetzal', symbol: 'Q', perUsd: 7.8 },
  { code: 'DOP', name: 'Dominican Peso', symbol: 'RD$', perUsd: 59 },
  { code: 'JMD', name: 'Jamaican Dollar', symbol: 'J$', perUsd: 155 },
  { code: 'BAM', name: 'Bosnian Mark', symbol: 'KM', perUsd: 1.8 },
  { code: 'ISK', name: 'Icelandic Krona', symbol: 'kr', perUsd: 140 },
  { code: 'QAR', name: 'Qatari Riyal', symbol: 'QR', perUsd: 3.64 },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'KD', perUsd: 0.31 },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: 'BD', perUsd: 0.376 },
  { code: 'OMR', name: 'Omani Rial', symbol: 'OMR', perUsd: 0.385 },
  { code: 'JOD', name: 'Jordanian Dinar', symbol: 'JD', perUsd: 0.709 },
  { code: 'LBP', name: 'Lebanese Pound', symbol: 'L\u00A3', perUsd: 89500 },
  { code: 'GEL', name: 'Georgian Lari', symbol: '\u20BE', perUsd: 2.7 },
  { code: 'AMD', name: 'Armenian Dram', symbol: '\u058F', perUsd: 385 },
  { code: 'AZN', name: 'Azerbaijani Manat', symbol: '\u20BC', perUsd: 1.7 },
  { code: 'KZT', name: 'Kazakhstani Tenge', symbol: '\u20B8', perUsd: 450 },
  { code: 'UZS', name: 'Uzbekistani Som', symbol: 'so\u02BBm', perUsd: 12700 },
  { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br', perUsd: 57 },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '\u20B5', perUsd: 15 },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', perUsd: 2550 },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh', perUsd: 3800 },
  { code: 'RWF', name: 'Rwandan Franc', symbol: 'RF', perUsd: 1280 },
  { code: 'MMK', name: 'Burmese Kyat', symbol: 'Ks', perUsd: 2100 },
  { code: 'MNT', name: 'Mongolian Tugrik', symbol: '\u20AE', perUsd: 3450 },
  { code: 'FJD', name: 'Fijian Dollar', symbol: 'FJ$', perUsd: 2.25 },
  { code: 'XOF', name: 'West African CFA Franc', symbol: 'CFA', perUsd: 605 },
  { code: 'XAF', name: 'Central African CFA Franc', symbol: 'FCFA', perUsd: 605 },
];

export function getCurrency(code: string): Currency {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
}

export function convertFromUsd(amountUsd: number, currency: Currency): number {
  return amountUsd * currency.perUsd;
}

const NO_DECIMAL_CODES = new Set([
  'JPY', 'KRW', 'IDR', 'VND', 'KHR', 'LAK', 'UZS', 'UGX', 'RWF', 'MMK', 'MNT',
  'XOF', 'XAF', 'LBP', 'NGN', 'TND',
]);

export function formatMoney(amount: number, currency: Currency): string {
  const rounded = Math.round(amount);
  const formatted = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(rounded);
  return `${currency.symbol}${formatted}`;
}

export { NO_DECIMAL_CODES };
