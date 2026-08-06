<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'
import {
  TestTubeIcon,
  Clock01Icon,
  Note01Icon,
  StarIcon,
  Alert02Icon,
  ArrowRight01Icon,
  ArrowLeft01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  ChampionIcon,
  Loading03Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import { Button } from '@/components/ui/button'
import { getExam, type ExamData } from '@/services/content.service'
import { useLocalized } from '@/composables/useLocalized'

const router = useRouter()
const { t } = useI18n()
const { pick } = useLocalized()

type Phase = 'intro' | 'quiz' | 'result'
const phase = ref<Phase>('intro')

const exam = ref<ExamData | null>(null)
const index = ref(0)
const answers = ref<Record<string, string>>({})
const savedIds = ref<Set<string>>(new Set())

const timeLeft = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(async () => {
  exam.value = await getExam()
})
onBeforeUnmount(() => clearInterval(timer))

const questions = computed(() => exam.value?.questions ?? [])
const current = computed(() => questions.value[index.value])
const answeredKey = computed(() => (current.value ? answers.value[current.value.id] : undefined))
const isAnswered = computed(() => answeredKey.value != null)
const correctCount = computed(
  () => questions.value.filter((q) => answers.value[q.id] === q.correct).length,
)
const scorePct = computed(() =>
  questions.value.length ? Math.round((correctCount.value / questions.value.length) * 100) : 0,
)

const timeLabel = computed(() => {
  const m = Math.floor(timeLeft.value / 60)
  const s = timeLeft.value % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})

const signTone: Record<string, string> = {
  warning: 'bg-amber-100 text-amber-900 ring-amber-300',
  prohibit: 'bg-red-100 text-red-900 ring-red-300',
  info: 'bg-blue-100 text-blue-900 ring-blue-300',
}

function start() {
  if (!exam.value) return
  phase.value = 'quiz'
  index.value = 0
  answers.value = {}
  savedIds.value = new Set()
  timeLeft.value = exam.value.meta.minutes * 60
  clearInterval(timer)
  timer = setInterval(() => {
    timeLeft.value -= 1
    if (timeLeft.value <= 0) {
      clearInterval(timer)
      toast.warning(t('exam.timeUp'))
      finish()
    }
  }, 1000)
}

function selectOption(key: string) {
  if (!current.value || isAnswered.value) return
  answers.value = { ...answers.value, [current.value.id]: key }
}

function toggleSave() {
  if (!current.value) return
  const set = new Set(savedIds.value)
  if (set.has(current.value.id)) {
    set.delete(current.value.id)
  } else {
    set.add(current.value.id)
    toast.success(t('exam.saved'))
  }
  savedIds.value = set
}

function goTo(i: number) {
  if (i >= 0 && i < questions.value.length) index.value = i
}
function next() {
  if (index.value < questions.value.length - 1) index.value += 1
  else finish()
}

function finish() {
  clearInterval(timer)
  phase.value = 'result'
}

function optionClass(key: string): string {
  if (!current.value) return ''
  if (!isAnswered.value) {
    return 'border-border bg-card hover:border-primary/50 hover:bg-primary/5'
  }
  if (key === current.value.correct) return 'border-emerald-400 bg-emerald-50 text-emerald-900'
  if (key === answeredKey.value) return 'border-red-400 bg-red-50 text-red-900'
  return 'border-border bg-card opacity-70'
}

function pageClass(i: number): string {
  const q = questions.value[i]
  const a = answers.value[q.id]
  if (i === index.value) return 'bg-primary text-primary-foreground'
  if (a != null) return a === q.correct ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
  return 'bg-muted text-muted-foreground hover:bg-muted-foreground/20'
}

function quit() {
  clearInterval(timer)
  router.push('/dashboard')
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-muted/30">
    <AppHeader />

    <main class="container-page flex-1 py-6 sm:py-10">
      <!-- ============================ LOADING ============================ -->
      <div v-if="!exam" class="flex justify-center py-20">
        <HugeiconsIcon :icon="Loading03Icon" class="size-6 animate-spin text-muted-foreground" />
      </div>

      <!-- ============================= INTRO ============================= -->
      <div v-else-if="phase === 'intro'" v-reveal class="mx-auto max-w-lg rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
        <span class="mx-auto grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
          <HugeiconsIcon :icon="TestTubeIcon" class="size-7" />
        </span>
        <h1 class="mt-5 text-2xl font-bold">{{ t('exam.introTitle') }}</h1>
        <p class="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">{{ t('exam.introSubtitle') }}</p>

        <div class="mt-6 flex items-center justify-center gap-3 text-sm">
          <span class="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
            <HugeiconsIcon :icon="Clock01Icon" class="size-4 text-primary" /> {{ exam.meta.minutes }} {{ t('common.minutes') }}
          </span>
          <span class="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
            <HugeiconsIcon :icon="Note01Icon" class="size-4 text-primary" /> {{ exam.meta.count }} {{ t('common.questions') }}
          </span>
        </div>

        <Button class="mt-7 h-11 w-full rounded-xl text-sm" @click="start">{{ t('exam.start') }}</Button>

        <p class="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <HugeiconsIcon :icon="Alert02Icon" class="size-4 text-orange-500" /> {{ t('exam.warning') }}
        </p>
      </div>

      <!-- ============================= QUIZ ============================= -->
      <div v-else-if="phase === 'quiz' && current" class="mx-auto max-w-4xl">
        <!-- Timer -->
        <div class="flex justify-center">
          <span class="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-lg font-semibold tabular-nums">
            <HugeiconsIcon :icon="Clock01Icon" class="size-5 text-primary" /> {{ timeLabel }}
          </span>
        </div>

        <!-- Pagination -->
        <div class="mt-5 flex flex-wrap justify-center gap-1.5">
          <button
            v-for="(q, i) in questions"
            :key="q.id"
            class="size-8 rounded-lg text-xs font-medium transition-colors"
            :class="pageClass(i)"
            @click="goTo(i)"
          >
            {{ i + 1 }}
          </button>
        </div>

        <!-- Question card -->
        <div class="mt-6 rounded-2xl border border-border bg-card p-5 sm:p-6">
          <div class="flex items-center justify-between">
            <span class="rounded-md bg-muted px-2.5 py-1 text-xs font-medium">
              {{ t('exam.questionLabel', { n: current.number }) }}
            </span>
            <button
              class="inline-flex items-center gap-1.5 text-sm transition-colors"
              :class="savedIds.has(current.id) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'"
              @click="toggleSave"
            >
              <HugeiconsIcon :icon="StarIcon" class="size-4" /> {{ t('exam.saveQuestion') }}
            </button>
          </div>

          <div class="mt-4 grid gap-5 lg:grid-cols-2">
            <!-- Sign (mobile: tepada) -->
            <div class="order-first lg:order-last">
              <div
                class="mx-auto flex aspect-video max-w-xs items-center justify-center rounded-xl ring-1 lg:max-w-none"
                :class="signTone[current.signTone]"
              >
                <span class="text-6xl sm:text-7xl">{{ current.sign }}</span>
              </div>

              <!-- Izoh (javob berilgach) -->
              <Transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 translate-y-1"
              >
                <div v-if="isAnswered" class="mt-4 flex gap-2.5 rounded-xl border border-border bg-muted/50 p-3">
                  <HugeiconsIcon :icon="InformationCircleIcon" class="mt-0.5 size-4 shrink-0 text-primary" />
                  <div>
                    <p class="text-xs font-semibold">{{ t('exam.explanation') }}</p>
                    <p class="mt-0.5 text-xs text-muted-foreground">{{ pick(current.explanation) }}</p>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- Question + options -->
            <div class="order-last lg:order-first">
              <h2 class="text-base font-semibold">{{ pick(current.text) }}</h2>
              <div class="mt-4 space-y-2.5">
                <button
                  v-for="opt in current.options"
                  :key="opt.key"
                  class="flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition-colors"
                  :class="optionClass(opt.key)"
                  :disabled="isAnswered"
                  @click="selectOption(opt.key)"
                >
                  <span class="grid size-6 shrink-0 place-items-center rounded-md bg-primary/10 text-xs font-semibold text-primary">
                    {{ opt.key }}
                  </span>
                  <span class="flex-1">{{ pick(opt.text) }}</span>
                  <HugeiconsIcon
                    v-if="isAnswered && opt.key === current.correct"
                    :icon="CheckmarkCircle02Icon"
                    class="size-5 text-emerald-500"
                  />
                  <HugeiconsIcon
                    v-else-if="isAnswered && opt.key === answeredKey"
                    :icon="Cancel01Icon"
                    class="size-5 text-red-500"
                  />
                </button>
              </div>
            </div>
          </div>

          <!-- Controls -->
          <div class="mt-6 flex items-center justify-between border-t border-border pt-4">
            <button class="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-destructive" @click="quit">
              <HugeiconsIcon :icon="Cancel01Icon" class="size-4" /> {{ t('exam.cancelTest') }}
            </button>
            <div class="flex items-center gap-2">
              <Button variant="outline" size="icon" class="size-9 rounded-lg" :disabled="index === 0" @click="goTo(index - 1)">
                <HugeiconsIcon :icon="ArrowLeft01Icon" class="size-4" />
              </Button>
              <Button class="h-9 rounded-lg px-4 text-sm" @click="next">
                <template v-if="index === questions.length - 1">{{ t('exam.finish') }}</template>
                <template v-else>{{ t('common.next') }}</template>
                <HugeiconsIcon :icon="ArrowRight01Icon" class="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- ============================ RESULT ============================ -->
      <div v-else-if="phase === 'result'" v-reveal class="mx-auto max-w-lg rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
        <span class="mx-auto grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
          <HugeiconsIcon :icon="ChampionIcon" class="size-7" />
        </span>
        <h1 class="mt-5 text-2xl font-bold">{{ t('exam.resultTitle') }}</h1>
        <p class="mt-1 text-sm text-muted-foreground">{{ t('exam.resultScore') }}</p>

        <p class="mt-4 text-5xl font-bold tracking-tight" :class="scorePct >= 55 ? 'text-emerald-500' : 'text-orange-500'">
          {{ scorePct }}%
        </p>
        <p class="mt-2 text-sm text-muted-foreground">
          {{ t('exam.correctCount') }}: <b class="text-foreground">{{ correctCount }}/{{ questions.length }}</b>
        </p>

        <div class="mt-7 flex flex-col gap-2.5 sm:flex-row">
          <Button class="h-11 flex-1 rounded-xl text-sm" @click="start">{{ t('exam.retry') }}</Button>
          <Button as-child variant="outline" class="h-11 flex-1 rounded-xl text-sm">
            <RouterLink to="/dashboard">{{ t('exam.toDashboard') }}</RouterLink>
          </Button>
        </div>
      </div>
    </main>
  </div>
</template>
