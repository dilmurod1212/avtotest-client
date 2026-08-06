import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'landing',
    component: () => import('@/views/LandingView.vue'),
    meta: { title: 'AvtoDrive — Haydovchilik imtihoniga tayyorgarlik' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: 'Profilga kirish — AvtoDrive' },
  },
  {
    path: '/verify',
    name: 'verify',
    component: () => import('@/views/VerifyView.vue'),
    meta: { title: 'Tasdiqlash kodi — AvtoDrive' },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { title: 'Profil — AvtoDrive', requiresAuth: true },
  },
  {
    path: '/tickets',
    name: 'tickets',
    component: () => import('@/views/TicketsView.vue'),
    meta: { title: 'Biletlar — AvtoDrive', requiresAuth: true },
  },
  {
    path: '/tests',
    name: 'tests',
    component: () => import('@/views/TestsView.vue'),
    meta: { title: 'Mavzulashtirilgan testlar — AvtoDrive', requiresAuth: true },
  },
  {
    path: '/topics',
    name: 'topics',
    component: () => import('@/views/TopicsView.vue'),
    meta: { title: "O'quv mavzular — AvtoDrive", requiresAuth: true },
  },
  {
    path: '/saved',
    name: 'saved',
    component: () => import('@/views/SavedView.vue'),
    meta: { title: 'Saqlangan savollar — AvtoDrive', requiresAuth: true },
  },
  {
    path: '/exam',
    name: 'exam',
    component: () => import('@/views/ExamView.vue'),
    meta: { title: 'Imtihon topshirish — AvtoDrive', requiresAuth: true },
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const { isAuthenticated } = useAuth()
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if ((to.name === 'login' || to.name === 'verify') && isAuthenticated.value) {
    return { name: 'dashboard' }
  }
  return true
})

router.afterEach((to) => {
  if (typeof to.meta.title === 'string') {
    document.title = to.meta.title
  }
})

export default router
