<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ViewIcon, Bookmark02Icon, Loading03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import PageShell from '@/components/layout/PageShell.vue'
import { getSavedQuestions, type SavedData } from '@/services/content.service'
import type { SavedCategory } from '@/data/mock-data'
import { useLocalized } from '@/composables/useLocalized'

const { t } = useI18n()
const { pick } = useLocalized()

const data = ref<SavedData | null>(null)
const filter = ref<'all' | SavedCategory>('all')

onMounted(async () => {
  data.value = await getSavedQuestions()
})

const tabs = computed(
  () =>
    [
      { key: 'all', label: t('saved.tabs.all') },
      { key: 'wrong', label: t('saved.tabs.wrong') },
      { key: 'marked', label: t('saved.tabs.marked') },
      { key: 'recent', label: t('saved.tabs.recent') },
    ] as const,
)

const filtered = computed(() => {
  if (!data.value) return []
  if (filter.value === 'all') return data.value.items
  return data.value.items.filter((q) => q.categories.includes(filter.value as SavedCategory))
})
</script>

<template>
  <PageShell :breadcrumb="t('saved.breadcrumb')" :title="t('saved.title')" :subtitle="t('saved.subtitle')">
    <template v-if="data" #header-extra>
      <div class="mt-5 flex justify-center">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-card px-3.5 py-1.5 text-sm">
          <HugeiconsIcon :icon="Bookmark02Icon" class="size-4 text-primary" />
          {{ t('saved.count', { count: data.count }) }}
        </span>
      </div>
    </template>

    <div v-if="data" class="mx-auto max-w-3xl">
      <!-- Tabs -->
      <div class="mb-6 flex flex-wrap justify-center gap-2">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="rounded-full border px-3.5 py-1.5 text-sm transition-colors"
          :class="filter === tab.key
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-border bg-card text-muted-foreground hover:text-foreground'"
          @click="filter = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Ro'yxat -->
      <TransitionGroup
        v-if="filtered.length"
        tag="div"
        class="space-y-3"
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        leave-active-class="transition duration-200 ease-in absolute"
        leave-to-class="opacity-0"
      >
        <div
          v-for="q in filtered"
          :key="q.id"
          class="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
        >
          <span class="text-sm font-semibold text-muted-foreground">{{ String(q.number).padStart(2, '0') }}</span>
          <p class="flex-1 text-sm">{{ pick(q.text) }}</p>
          <button class="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <HugeiconsIcon :icon="ViewIcon" class="size-5" />
          </button>
        </div>
      </TransitionGroup>

      <p v-else class="py-14 text-center text-sm text-muted-foreground">{{ t('saved.empty') }}</p>
    </div>

    <div v-else class="flex justify-center py-16">
      <HugeiconsIcon :icon="Loading03Icon" class="size-6 animate-spin text-muted-foreground" />
    </div>
  </PageShell>
</template>
