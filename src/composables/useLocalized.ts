import { useI18n } from 'vue-i18n'
import type { AppLocale } from '@/i18n'
import type { LString } from '@/data/mock-data'

/**
 * Backend'dan kelgan ikki tilli ({ uz, ru }) matnni joriy tilga qarab tanlaydi.
 */
export function useLocalized() {
  const { locale } = useI18n()
  const pick = (s: LString | string | undefined): string => {
    if (s == null) return ''
    if (typeof s === 'string') return s
    return s[locale.value as AppLocale] ?? s.uz
  }
  return { pick, locale }
}
