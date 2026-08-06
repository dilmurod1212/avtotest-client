import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { http } from './http'
import {
  activeStudents,
  brands,
  currentUser,
  dashboardCards,
  dashboardProgress,
  examMeta,
  examQuestions,
  faqs,
  heroFeatures,
  landingStats,
  leaderboard,
  plan,
  savedCount,
  savedQuestions,
  steps,
  testimonial,
  theoryTopics,
  ticketCounts,
  ticketStats,
  tickets,
  topicTests,
  topicsProgress,
} from '@/data/mock-data'

/**
 * Mock adapter — real backend hali yo'q bo'lgani uchun axios so'rovlarini
 * shu yerda mock ma'lumot bilan javob beramiz. So'rovlar baribir
 * request/response interceptorlardan o'tadi, ya'ni real backendga
 * ulanganda faqat shu adapterni o'chirish kifoya.
 */

type Handler = (config: InternalAxiosRequestConfig) => unknown

interface Route {
  method: string
  match: RegExp
  handler: Handler
}

const routes: Route[] = [
  // Landing
  {
    method: 'get',
    match: /\/landing$/,
    handler: () => ({
      heroFeatures,
      brands,
      steps,
      testimonial,
      stats: landingStats,
      plan,
      faqs,
    }),
  },
  // Auth: telefon raqamiga kod yuborish
  {
    method: 'post',
    match: /\/auth\/request-code$/,
    handler: (config) => {
      const body = JSON.parse(config.data ?? '{}')
      return {
        phone: body.phone ?? currentUser.phone,
        // demo uchun kod: 4709
        expiresIn: 120,
        message: 'Tasdiqlash kodi yuborildi',
      }
    },
  },
  // Auth: kodni tasdiqlash
  {
    method: 'post',
    match: /\/auth\/verify$/,
    handler: (config) => {
      const body = JSON.parse(config.data ?? '{}')
      const code = String(body.code ?? '')
      if (code !== '4709') {
        const err = new Error("Tasdiqlash kodi noto'g'ri") as Error & { status?: number }
        err.status = 422
        throw err
      }
      return {
        token: 'mock-jwt-token.' + Math.random().toString(36).slice(2),
        user: currentUser,
      }
    },
  },
  // Auth: joriy foydalanuvchi
  {
    method: 'get',
    match: /\/auth\/me$/,
    handler: () => currentUser,
  },
  // Dashboard
  {
    method: 'get',
    match: /\/dashboard$/,
    handler: () => ({
      user: currentUser,
      cards: dashboardCards,
      progress: dashboardProgress,
      activeStudents,
    }),
  },
  // Leaderboard (period query orqali)
  {
    method: 'get',
    match: /\/leaderboard/,
    handler: (config) => {
      const period = (config.params?.period ?? 'monthly') as keyof typeof leaderboard
      return leaderboard[period] ?? leaderboard.monthly
    },
  },
  // Biletlar
  {
    method: 'get',
    match: /\/tickets$/,
    handler: () => ({ stats: ticketStats, counts: ticketCounts, items: tickets }),
  },
  // Mavzulashtirilgan testlar
  {
    method: 'get',
    match: /\/topic-tests$/,
    handler: () => topicTests,
  },
  // O'quv mavzular
  {
    method: 'get',
    match: /\/theory-topics$/,
    handler: () => ({ progress: topicsProgress, items: theoryTopics }),
  },
  // Saqlangan savollar
  {
    method: 'get',
    match: /\/saved-questions$/,
    handler: () => ({ count: savedCount, items: savedQuestions }),
  },
  // Imtihon savollari
  {
    method: 'get',
    match: /\/exam$/,
    handler: () => ({ meta: examMeta, questions: examQuestions }),
  },
]

function buildResponse(
  config: InternalAxiosRequestConfig,
  status: number,
  data: unknown,
): AxiosResponse {
  return {
    data,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    headers: {},
    config,
    request: {},
  }
}

const mockAdapter: AxiosAdapter = (config) => {
  const url = config.url ?? ''
  const method = (config.method ?? 'get').toLowerCase()
  const route = routes.find((r) => r.method === method && r.match.test(url))

  // Tarmoq kechikishini simulyatsiya qilamiz
  const latency = 350 + Math.random() * 350

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!route) {
        reject({
          config,
          response: buildResponse(config, 404, { message: `Topilmadi: ${method.toUpperCase()} ${url}` }),
          isAxiosError: true,
          message: 'Not found',
        })
        return
      }
      try {
        const data = route.handler(config)
        resolve(buildResponse(config, 200, data))
      } catch (e) {
        const err = e as Error & { status?: number }
        reject({
          config,
          response: buildResponse(config, err.status ?? 500, { message: err.message }),
          isAxiosError: true,
          message: err.message,
        })
      }
    }, latency)
  })
}

/**
 * Mock rejimini yoqadi. VITE_API_MOCK=false qilib real backendga ulanish mumkin.
 */
export function setupMock() {
  const enabled = import.meta.env.VITE_API_MOCK !== 'false'
  if (enabled) {
    http.defaults.adapter = mockAdapter
    // eslint-disable-next-line no-console
    console.info('%c[AvtoDrive] Mock API yoqilgan', 'color:#6366f1')
  }
}
