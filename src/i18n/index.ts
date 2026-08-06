import { createI18n } from 'vue-i18n'
import uz from './locales/uz'
import ru from './locales/ru'

export type AppLocale = 'uz' | 'ru'
export const LOCALE_KEY = 'avtodrive:locale'

export const localeOptions: { value: AppLocale; label: string; flag: string }[] = [
  { value: 'uz', label: "O'zbekcha", flag: '🇺🇿' },
  { value: 'ru', label: 'Русский', flag: '🇷🇺' },
]

function getInitialLocale(): AppLocale {
  const saved = localStorage.getItem(LOCALE_KEY)
  return saved === 'ru' || saved === 'uz' ? saved : 'uz'
}

export const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'uz',
  messages: { uz, ru },
})

/** Joriy tilni qaytaradi (interceptor va service'lar uchun) */
export function currentLocale(): AppLocale {
  return i18n.global.locale.value as AppLocale
}

export function setLocale(locale: AppLocale) {
  i18n.global.locale.value = locale
  localStorage.setItem(LOCALE_KEY, locale)
  document.documentElement.lang = locale
}

// Boshlang'ich til atributini o'rnatamiz
document.documentElement.lang = getInitialLocale()

export default i18n
