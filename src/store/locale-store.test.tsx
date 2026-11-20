import { describe, it, expect } from 'vitest';
import { useLocaleStore } from './locale-store';

describe('locale store', () => {
  it('updates document.lang when locale changes', () => {
    const { setLocale } = useLocaleStore();

    // Set Spanish locale
    setLocale('es');

    // Check that document.lang was updated by the LanguageSwitcher effect
    expect(document.documentElement.getAttribute('lang')).toBe('es');

    // Check dir attribute
    expect(document.documentElement.getAttribute('dir')).toBe('ltr');
  });

  it('stores and restores time zone', () => {
    const { timeZone, setTimeZone } = useLocaleStore();

    // Set a specific time zone
    setTimeZone('America/New_York');

    expect(timeZone).toBe('America/New_York');
  });
});