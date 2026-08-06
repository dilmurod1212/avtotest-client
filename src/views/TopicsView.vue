<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  Book02Icon,
  SquareLock02Icon,
  CheckmarkBadge01Icon,
  Loading03Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import PageShell from '@/components/layout/PageShell.vue'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getTheoryTopics, type TheoryData } from '@/services/content.service'
import { useLocalized } from '@/composables/useLocalized'

const { t } = useI18n()
const { pick } = useLocalized()

const data = ref<TheoryData | null>(null)
const tab = ref('rules')

const tabKeys = ['basics', 'signs', 'rules', 'practice', 'exam', 'analysis']

onMounted(async () => {
  data.value = await getTheoryTopics()
})
</script>

<template>
  <PageShell :breadcrumb="t('topics.breadcrumb')" :title="t('topics.title')" :subtitle="t('topics.subtitle')">
    <template v-if="data" #header-extra>
      <div class="mt-5 flex justify-center">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-card px-3.5 py-1.5 text-sm text-muted-foreground">
          {{ t('topics.progress', { done: data.progress.done, total: data.progress.total }) }}
        </span>
      </div>
    </template>

    <div v-if="data" class="mx-auto max-w-3xl">
      <!-- Tabs -->
      <div class="no-scrollbar scroll-fade-x mb-6 flex justify-center overflow-x-auto">
        <Tabs v-model="tab">
          <TabsList class="rounded-full">
            <TabsTrigger v-for="k in tabKeys" :key="k" :value="k" class="rounded-full text-xs sm:text-sm">
              {{ t(`topics.tabs.${k}`) }}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <!-- Mavzular ro'yxati -->
      <div class="space-y-3">
        <div
          v-for="(topic, i) in data.items"
          :key="topic.id"
          v-reveal="i * 60"
          class="flex items-center gap-4 rounded-2xl border p-4 transition-colors"
          :class="topic.locked
            ? 'border-border bg-muted/40'
            : 'border-border bg-card hover:border-primary/40 cursor-pointer'"
        >
          <span
            class="text-sm font-semibold"
            :class="topic.locked ? 'text-muted-foreground/50' : 'text-muted-foreground'"
          >
            {{ String(topic.number).padStart(2, '0') }}
          </span>
          <p class="flex-1 text-sm" :class="topic.locked ? 'text-muted-foreground/70' : ''">
            {{ pick(topic.title) }}
          </p>
          <span
            class="grid size-8 shrink-0 place-items-center rounded-lg"
            :class="topic.locked ? 'text-muted-foreground/50' : 'bg-primary/10 text-primary'"
          >
            <HugeiconsIcon :icon="topic.locked ? SquareLock02Icon : Book02Icon" class="size-5" />
          </span>
        </div>
      </div>

      <p class="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <HugeiconsIcon :icon="CheckmarkBadge01Icon" class="size-4" />
        {{ t('topics.note') }}
      </p>
    </div>

    <div v-else class="flex justify-center py-16">
      <HugeiconsIcon :icon="Loading03Icon" class="size-6 animate-spin text-muted-foreground" />
    </div>
  </PageShell>
</template>
