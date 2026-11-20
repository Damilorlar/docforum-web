import { useEffect } from 'react';
import { useLocaleStore } from '../store/locale-store';

export function LanguageSwitcher() {
  const { locale } = useLocaleStore();

  useEffect(() => {
    // Update <html lang> when the locale changes
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('lang', locale);
    htmlElement.setAttribute('dir', locale === 'en' ? 'ltr' : 'rtl');
  }, [locale]);

  return null;
}