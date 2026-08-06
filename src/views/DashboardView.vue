<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  TicketStarIcon,
  Note01Icon,
  TestTubeIcon,
  Bookmark02Icon,
  TrafficLightIcon,
  ArrowRight01Icon,
  ChampionIcon,
  CheckmarkBadge01Icon,
  Loading03Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AppHeader from '@/components/layout/AppHeader.vue'
import LandingFooter from '@/components/layout/LandingFooter.vue'
import {
  getDashboard,
  getLeaderboard,
  type DashboardData,
  type LeaderboardPeriod,
} from '@/services/dashboard.service'
import type { LeaderboardEntry } from '@/data/mock-data'
import { useLocalized } from '@/composables/useLocalized'

const { t } = useI18n()
const { pick } = useLocalized()

const iconMap: Record<string, any> = {
  TicketStar: TicketStarIcon,
  Note01: Note01Icon,
  TestTube: TestTubeIcon,
  Bookmark02: Bookmark02Icon,
  TrafficLight: TrafficLightIcon,
}

const data = ref<DashboardData | null>(null)
const loading = ref(true)

const period = ref<LeaderboardPeriod>('monthly')
const board = ref<LeaderboardEntry[]>([])
const boardLoading = ref(false)

const SEGMENTS = 44
const filledSegments = computed(() =>
  data.value ? Math.round((data.value.progress.overall / 100) * SEGMENTS) : 0,
)

async function loadBoard() {
  boardLoading.value = true
  try {
    board.value = await getLeaderboard(period.value)
  } finally {
    boardLoading.value = false
  }
}

watch(period, loadBoard)

onMounted(async () => {
  try {
    data.value = await getDashboard()
    await loadBoard()
  } finally {
    loading.value = false
  }
})

const rankTone: Record<number, string> = {
  1: 'bg-amber-400 text-amber-950',
  2: 'bg-slate-300 text-slate-700',
  3: 'bg-orange-300 text-orange-900',
}
</script>

<template>
  <div class="min-h-screen bg-muted/30">
    <AppHeader />

    <template v-if="data">
      <main class="container-page py-6 sm:py-8">
        <!-- ===================== ACTION CARDS ===================== -->
        <section class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          <RouterLink
            v-for="(c, i) in data.cards"
            :key="c.id"
            :to="c.to"
            v-reveal="i * 70"
            :class="[
              'group relative flex flex-col overflow-hidden rounded-2xl p-5 text-white transition-transform hover:-translate-y-1',
              `card-${c.tone}`,
              i < 3 ? 'lg:row-span-2' : '',
            ]"
          >
            <div class="flex items-start justify-between">
              <span class="grid size-11 place-items-center rounded-xl bg-white/20 backdrop-blur">
                <HugeiconsIcon :icon="iconMap[c.icon]" class="size-6" />
              </span>
              <span
                v-if="c.badge"
                class="rounded-full bg-black/25 px-2.5 py-1 text-[11px] font-medium"
              >
                {{ pick(c.badge) }}
              </span>
            </div>
            <h3 class="mt-4 text-lg font-semibold">{{ pick(c.title) }}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-white/85">{{ pick(c.description) }}</p>
            <div class="mt-auto pt-4">
              <span class="inline-flex size-8 items-center justify-center rounded-lg bg-white/15 transition-transform group-hover:translate-x-1">
                <HugeiconsIcon :icon="ArrowRight01Icon" class="size-4" />
              </span>
            </div>
          </RouterLink>
        </section>

        <!-- ===================== PROGRESS ===================== -->
        <section class="mt-4 rounded-2xl border border-border bg-card p-5 sm:p-6">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p class="font-semibold">{{ data.user.name }}</p>
              <p class="text-sm text-muted-foreground">{{ t('dashboard.level') }}: {{ pick(data.user.level) }}</p>
            </div>
          </div>

          <div class="mt-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p class="text-lg font-semibold">
                {{ t('dashboard.overallTitle', { value: data.progress.overall }) }}
              </p>
              <p class="text-sm text-muted-foreground">
                {{ t('dashboard.overallHint', { target: data.progress.target }) }}
              </p>
            </div>
            <Button as-child class="h-10 rounded-lg px-4 text-sm">
              <RouterLink to="/exam">{{ t('dashboard.newTest') }}</RouterLink>
            </Button>
          </div>

          <!-- Segmentli progress bar -->
          <div class="mt-4 flex gap-[3px]">
            <span
              v-for="n in SEGMENTS"
              :key="n"
              class="h-6 flex-1 rounded-[2px]"
              :class="n <= filledSegments ? 'bg-emerald-500' : 'bg-muted'"
            />
          </div>

          <!-- Metrikalar -->
          <div class="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5 lg:grid-cols-4">
            <div v-for="m in data.progress.metrics" :key="m.id">
              <p class="text-xl font-bold">{{ m.value }}</p>
              <p class="mt-0.5 text-xs text-muted-foreground">{{ pick(m.label) }}</p>
            </div>
          </div>
        </section>

        <!-- ===================== LEADERBOARD ===================== -->
        <section class="mt-10 sm:mt-14">
          <div class="text-center">
            <span class="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              <HugeiconsIcon :icon="ChampionIcon" class="size-4" /> {{ t('dashboard.ratingBadge') }}
            </span>
            <h2 class="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              {{ t('dashboard.ratingTitle') }}
            </h2>
            <p class="mt-2 text-sm text-muted-foreground">
              {{ t('dashboard.ratingSubtitle') }}
            </p>
          </div>

          <div class="mt-6 flex justify-center">
            <Tabs v-model="period">
              <TabsList class="rounded-full">
                <TabsTrigger value="weekly" class="rounded-full">{{ t('dashboard.weekly') }}</TabsTrigger>
                <TabsTrigger value="monthly" class="rounded-full">{{ t('dashboard.monthly') }}</TabsTrigger>
                <TabsTrigger value="all" class="rounded-full">{{ t('dashboard.allTime') }}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div class="mx-auto mt-6 max-w-2xl space-y-3">
            <div v-if="boardLoading" class="flex justify-center py-8">
              <HugeiconsIcon :icon="Loading03Icon" class="size-5 animate-spin text-muted-foreground" />
            </div>

            <div
              v-for="entry in board"
              v-else
              :key="entry.id"
              class="flex items-center gap-3 rounded-2xl border bg-card p-3 pr-4 sm:gap-4 sm:p-4"
              :class="entry.isCurrentUser ? 'border-primary/40 ring-2 ring-primary/10' : 'border-border'"
            >
              <span
                class="grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold"
                :class="rankTone[entry.rank] ?? 'bg-muted text-muted-foreground'"
              >
                {{ entry.rank }}
              </span>
              <Avatar class="size-10">
                <AvatarImage :src="entry.avatar" :alt="entry.name" />
                <AvatarFallback>{{ entry.name.charAt(0) }}</AvatarFallback>
              </Avatar>
              <div class="min-w-0 flex-1">
                <p class="flex items-center gap-1.5 truncate text-sm font-medium">
                  {{ entry.name }}
                  <HugeiconsIcon
                    v-if="entry.verified"
                    :icon="CheckmarkBadge01Icon"
                    class="size-4 text-primary"
                  />
                </p>
                <p class="text-xs text-muted-foreground">
                  {{ entry.tests }} {{ t('dashboard.testsCount') }} • {{ entry.accuracy }}% {{ t('dashboard.accuracy') }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-sm font-bold">{{ entry.score.toLocaleString('ru-RU') }}</p>
                <p class="text-xs text-muted-foreground">{{ t('dashboard.points') }}</p>
              </div>
            </div>
          </div>

          <!-- Faol talabalar -->
          <div class="mt-8 flex flex-col items-center">
            <div class="flex -space-x-3">
              <img
                v-for="(a, i) in data.activeStudents.avatars"
                :key="i"
                :src="a"
                alt=""
                class="size-9 rounded-full border-2 border-background object-cover"
              />
            </div>
            <p class="mt-3 text-sm font-semibold">
              {{ data.activeStudents.count }} {{ pick(data.activeStudents.label) }}
            </p>
            <p class="text-xs text-muted-foreground">{{ pick(data.activeStudents.hint) }}</p>
          </div>
        </section>
      </main>
    </template>

    <div v-else class="flex h-[70vh] items-center justify-center">
      <HugeiconsIcon :icon="Loading03Icon" class="size-6 animate-spin text-muted-foreground" />
    </div>

    <LandingFooter />
  </div>
</template>
