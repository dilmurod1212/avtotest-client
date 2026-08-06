import { http } from '@/lib/http'
import type {
  ExamQuestion,
  SavedQuestion,
  TheoryTopic,
  Ticket,
  TopicTest,
} from '@/data/mock-data'

/* ------------------------------- Biletlar --------------------------------- */
export interface TicketsData {
  stats: { avg: number; done: string; top: number }
  counts: { all: number; inProgress: number; completed: number; notStarted: number }
  items: Ticket[]
}
export async function getTickets(): Promise<TicketsData> {
  const { data } = await http.get<TicketsData>('/tickets')
  return data
}

/* -------------------------- Mavzulashtirilgan testlar --------------------- */
export async function getTopicTests(): Promise<TopicTest[]> {
  const { data } = await http.get<TopicTest[]>('/topic-tests')
  return data
}

/* ----------------------------- O'quv mavzular ----------------------------- */
export interface TheoryData {
  progress: { done: number; total: number }
  items: TheoryTopic[]
}
export async function getTheoryTopics(): Promise<TheoryData> {
  const { data } = await http.get<TheoryData>('/theory-topics')
  return data
}

/* ---------------------------- Saqlangan savollar -------------------------- */
export interface SavedData {
  count: number
  items: SavedQuestion[]
}
export async function getSavedQuestions(): Promise<SavedData> {
  const { data } = await http.get<SavedData>('/saved-questions')
  return data
}

/* ------------------------------- Imtihon ---------------------------------- */
export interface ExamData {
  meta: { minutes: number; count: number }
  questions: ExamQuestion[]
}
export async function getExam(): Promise<ExamData> {
  const { data } = await http.get<ExamData>('/exam')
  return data
}
