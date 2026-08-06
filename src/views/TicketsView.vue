<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  AnalyticsUpIcon,
  CheckmarkSquare01Icon,
  FireIcon,
  Note01Icon,
  Clock01Icon,
  Loading03Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import PageShell from '@/components/layout/PageShell.vue'
import { getTickets, type TicketsData } from '@/services/content.service'
import type { Status } from '@/data/mock-data'

const { t } = useI18n()

const data = ref<TicketsData | null>(null)
const filter = ref<'all' | Status>('all')

onMounted(async () => {
  data.value = await getTickets()
})

const filtered = computed(() => {
  if (!data.value) return []
  if (filter.value === 'all') return data.value.items
  return data.value.items.filter((t) => t.status === filter.value)
})

const filterTabs = computed(() =>
  data.value
    ? ([
        { key: 'all', label: t('common.all'), count: data.value.counts.all },
        { key: 'inProgress', label: t('common.inProgress'), count: data.value.counts.inProgress },
        { key: 'completed', label: t('common.completed'), count: data.value.counts.completed },
        { key: 'notStarted', label: t('common.notStarted'), count: data.value.counts.notStarted },
      ] as const)
    : [],
)
</script>

<template>
  <PageShell :breadcrumb="t('tickets.breadcrumb')" :title="t('tickets.title')" :subtitle="t('tickets.subtitle')">
    <template v-if="data" #header-extra>
      <div class="mt-5 flex flex-wrap items-center justify-center gap-2.5">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-sm">
          <HugeiconsIcon :icon="AnalyticsUpIcon" class="size-4 text-primary" />
          <b>{{ data.stats.avg }}%</b> <span class="text-muted-foreground">{{ t('tickets.avgResult') }}</span>
        </span>
        <span class="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-sm">
          <HugeiconsIcon :icon="CheckmarkSquare01Icon" class="size-4 text-emerald-500" />
          <b>{{ data.stats.done }}</b> <span class="text-muted-foreground">{{ t('tickets.doneTickets') }}</span>
        </span>
        <span class="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-sm">
          <HugeiconsIcon :icon="FireIcon" class="size-4 text-orange-500" />
          <b>{{ data.stats.top }}%</b> <span class="text-muted-foreground">{{ t('tickets.topResult') }}</span>
        </span>
      </div>
    </template>

    <div v-if="data">
      <!-- Filtrlar -->
      <div class="mb-6 flex flex-wrap justify-center gap-2">
        <button
          v-for="tab in filterTabs"
          :key="tab.key"
          class="rounded-full border px-3.5 py-1.5 text-sm transition-colors"
          :class="filter === tab.key
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-border bg-card text-muted-foreground hover:text-foreground'"
          @click="filter = tab.key"
        >
          {{ tab.label }} <span class="opacity-60">({{ tab.count }})</span>
        </button>
      </div>

      <!-- Kartalar -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(ticket, i) in filtered"
          :key="ticket.id"
          v-reveal="(i % 3) * 70"
          class="hover-lift cursor-pointer rounded-2xl border border-border bg-card p-5 hover:shadow-md"
        >
          <div class="flex items-start justify-between">
            <span class="text-lg font-bold text-primary">{{ String(ticket.number).padStart(2, '0') }}</span>
            <div class="text-right">
              <p class="text-sm font-medium">{{ t('tickets.ticket') }}</p>
              <p class="mt-0.5 flex items-center justify-end gap-2.5 text-xs text-muted-foreground">
                <span class="inline-flex items-center gap-1">
                  <HugeiconsIcon :icon="Note01Icon" class="size-3.5" /> {{ ticket.questions }} {{ t('common.questions') }}
                </span>
                <span class="inline-flex items-center gap-1">
                  <HugeiconsIcon :icon="Clock01Icon" class="size-3.5" /> {{ ticket.minutes }} {{ t('common.minutes') }}
                </span>
              </p>
            </div>
          </div>

          <div class="mt-5 flex items-center justify-between text-xs">
            <span :class="ticket.status === 'notStarted' ? 'text-muted-foreground' : 'font-medium'">
              <template v-if="ticket.result != null">{{ t('common.result') }}: {{ ticket.result }}%</template>
              <template v-else>{{ t('common.notStarted') }}</template>
            </span>
            <span class="text-muted-foreground">{{ t('common.attempts') }}: {{ ticket.attempts }}</span>
          </div>

          <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              class="h-full rounded-full transition-all"
              :class="(ticket.result ?? 0) >= 90 ? 'bg-emerald-500' : 'bg-primary'"
              :style="{ width: (ticket.result ?? 0) + '%' }"
            />
          </div>
        </article>
      </div>
    </div>

    <div v-else class="flex justify-center py-16">
      <HugeiconsIcon :icon="Loading03Icon" class="size-6 animate-spin text-muted-foreground" />
    </div>
  </PageShell>
</template>
