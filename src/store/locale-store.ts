import { create } from 'zustand';

export type Locale = 'en' | 'es';

export interface LocaleStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  timeZone: string;
  setTimeZone: (tz: string) => void;
}

// Merged locale store — combines message catalog formatting with document language.
// Keeps the time-zone field from the former i18n store; all consumers import
// from this single source of truth.
export const useLocaleStore = create<LocaleStore>((set) => ({
  locale: 'en',
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  setLocale: (locale: Locale) => set({ locale }),
  setTimeZone: (timeZone: string) => set({ timeZone }),
}));