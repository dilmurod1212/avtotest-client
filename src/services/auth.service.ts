import { http } from '@/lib/http'
import type { User } from '@/data/mock-data'

export interface RequestCodeResponse {
  phone: string
  expiresIn: number
  message: string
}

export interface VerifyResponse {
  token: string
  user: User
}

/** Telefon raqamiga tasdiqlash kodini yuborish */
export async function requestCode(phone: string): Promise<RequestCodeResponse> {
  const { data } = await http.post<RequestCodeResponse>('/auth/request-code', { phone })
  return data
}

/** Tasdiqlash kodini tekshirish (demo kod: 4709) */
export async function verifyCode(phone: string, code: string): Promise<VerifyResponse> {
  const { data } = await http.post<VerifyResponse>('/auth/verify', { phone, code })
  return data
}

/** Joriy foydalanuvchi ma'lumotlari */
export async function fetchMe(): Promise<User> {
  const { data } = await http.get<User>('/auth/me')
  return data
}
