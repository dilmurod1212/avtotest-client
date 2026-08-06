<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  TrafficLightIcon,
  RoadLocation01Icon,
  ParkingAreaCircleIcon,
  RoadIcon,
  ShieldIcon,
  Note01Icon,
  Clock01Icon,
  Loading03Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import PageShell from '@/components/layout/PageShell.vue'
import { getTopicTests } from '@/services/content.service'
import type { TopicTest } from '@/data/mock-data'
import { useLocalized } from '@/composables/useLocalized'

const { t } = useI18n()
const { pick } = useLocalized()

const iconMap: Record<string, any> = {
  TrafficLight: TrafficLightIcon,
  RoadLocation01: RoadLocation01Icon,
  ParkingAreaCircle: ParkingAreaCircleIcon,
  RoadIcon,
  ShieldIcon,
}

const items = ref<TopicTest[] | null>(null)

onMounted(async () => {
  items.value = await getTopicTests()
})
</script>

<template>
  <PageShell :breadcrumb="t('tests.breadcrumb')" :title="t('tests.title')" :subtitle="t('tests.subtitle')">
    <div v-if="items" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="(test, i) in items"
        :key="test.id"
        v-reveal="(i % 3) * 70"
        class="hover-lift cursor-pointer rounded-2xl border border-border bg-card p-5 hover:shadow-md"
      >
        <div class="flex items-center gap-3">
          <span class="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <HugeiconsIcon :icon="iconMap[test.icon] ?? RoadIcon" class="size-6" />
          </span>
          <div class="min-w-0">
            <h3 class="truncate font-semibold">{{ pick(test.title) }}</h3>
            <p class="flex items-center gap-2.5 text-xs text-muted-foreground">
              <span class="inline-flex items-center gap-1">
                <HugeiconsIcon :icon="Note01Icon" class="size-3.5" /> {{ test.questions }} {{ t('common.questions') }}
              </span>
              <span class="inline-flex items-center gap-1">
                <HugeiconsIcon :icon="Clock01Icon" class="size-3.5" /> {{ test.minutes }} {{ t('common.minutes') }}
              </span>
            </p>
          </div>
        </div>

        <div class="mt-5 flex items-center justify-between text-xs">
          <span :class="test.status === 'notStarted' ? 'text-muted-foreground' : 'font-medium'">
            <template v-if="test.result != null">{{ t('common.result') }}: {{ test.result }}%</template>
            <template v-else>{{ t('common.notStarted') }}</template>
          </span>
          <span class="text-muted-foreground">{{ t('common.attempts') }}: {{ test.attempts }}</span>
        </div>

        <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            class="h-full rounded-full transition-all"
            :class="(test.result ?? 0) >= 90 ? 'bg-emerald-500' : 'bg-primary'"
            :style="{ width: (test.result ?? 0) + '%' }"
          />
        </div>
      </article>
    </div>

    <div v-else class="flex justify-center py-16">
      <HugeiconsIcon :icon="Loading03Icon" class="size-6 animate-spin text-muted-foreground" />
    </div>
  </PageShell>
</template>
