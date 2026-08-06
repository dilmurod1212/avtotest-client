import { computed, ref } from 'vue'
import { TOKEN_KEY, USER_KEY } from '@/lib/http'
import type { User } from '@/data/mock-data'

function readUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))
const user = ref<User | null>(readUser())

/**
 * Oddiy auth holati — global reactive singleton.
 * Real ilovada Pinia'ga ko'chirish mumkin.
 */
export function useAuth() {
  const isAuthenticated = computed(() => Boolean(token.value))

  function setSession(newToken: string, newUser: User) {
    token.value = newToken
    user.value = newUser
    localStorage.setItem(TOKEN_KEY, newToken)
    localStorage.setItem(USER_KEY, JSON.stringify(newUser))
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  return { token, user, isAuthenticated, setSession, logout }
}
