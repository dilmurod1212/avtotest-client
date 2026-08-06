import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'

/**
 * Kalitlar — token va foydalanuvchini localStorage'da saqlash uchun.
 */
export const TOKEN_KEY = 'avtodrive:token'
export const USER_KEY = 'avtodrive:user'

/**
 * Backend manzili. `.env` faylida VITE_API_BASE_URL orqali override qilinadi.
 * Hozircha barcha so'rovlar mock adapter orqali javob qaytaradi (src/lib/mock.ts).
 */
const baseURL = import.meta.env.VITE_API_BASE_URL ?? '/api'

export const http: AxiosInstance = axios.create({
  baseURL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

/* -------------------------------------------------------------------------- */
/*  Request interceptor — har bir so'rovga auth tokenni qo'shadi              */
/* -------------------------------------------------------------------------- */
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`)
    }
    // Tilni har bir so'rovga qo'shamiz (uz/ru)
    config.headers.set('Accept-Language', localStorage.getItem('avtodrive:locale') ?? 'uz')
    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

/* -------------------------------------------------------------------------- */
/*  Response interceptor — javobni unwrap qiladi va xatolarni boshqaradi      */
/* -------------------------------------------------------------------------- */
export interface ApiError {
  status: number
  message: string
  raw?: unknown
}

http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status ?? 0

    // 401 — sessiya tugagan, foydalanuvchini login sahifasiga qaytaramiz
    if (status === 401) {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
        window.location.assign('/login')
      }
    }

    const apiError: ApiError = {
      status,
      message:
        error.response?.data?.message ??
        (status === 0 ? 'Serverga ulanib bo\'lmadi' : 'Nimadir xato ketdi'),
      raw: error.response?.data,
    }

    return Promise.reject(apiError)
  },
)

export default http
