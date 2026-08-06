import { http } from '@/lib/http'
import type { DashboardCard, LeaderboardEntry, LString, User } from '@/data/mock-data'

export interface DashboardData {
  user: User
  cards: DashboardCard[]
  progress: {
    overall: number
    target: number
    metrics: { id: string; value: string; label: LString }[]
  }
  activeStudents: {
    count: string
    label: LString
    hint: LString
    avatars: string[]
  }
}

export type LeaderboardPeriod = 'weekly' | 'monthly' | 'all'

export async function getDashboard(): Promise<DashboardData> {
  const { data } = await http.get<DashboardData>('/dashboard')
  return data
}

export async function getLeaderboard(
  period: LeaderboardPeriod = 'monthly',
): Promise<LeaderboardEntry[]> {
  const { data } = await http.get<LeaderboardEntry[]>('/leaderboard', {
    params: { period },
  })
  return data
}
