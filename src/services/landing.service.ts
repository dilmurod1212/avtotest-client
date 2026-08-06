import { http } from '@/lib/http'
import type { Brand, Faq, Feature, LString, Plan, Stat, Step } from '@/data/mock-data'

export interface LandingData {
  heroFeatures: Feature[]
  brands: Brand[]
  steps: Step[]
  testimonial: {
    name: string
    role: LString
    quote: LString
    avatar: string
    stats: { label: LString; value: string }[]
  }
  stats: Stat[]
  plan: Plan
  faqs: Faq[]
}

export async function getLanding(): Promise<LandingData> {
  const { data } = await http.get<LandingData>('/landing')
  return data
}
