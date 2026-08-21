type Locale = 'en' | 'fr';
const SUPPORTED_LOCALES: Locale[] = ['en', 'fr'];
export const DEFAULT_APP_LOCALE = 'en';

function isLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

function getLocale(): Locale {
  const locale = process.env.LOCALE || DEFAULT_APP_LOCALE;
  if (!isLocale(locale)) {
    throw new Error(`Unsupported LOCALE "${locale}". Expected one of: ${SUPPORTED_LOCALES.join(', ')}`);
  }
  return locale;
}
export const locale = getLocale();
export const localeData = require(`../data/locales/${locale}.json`);