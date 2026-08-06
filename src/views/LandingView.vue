<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  ArrowUpRightIcon,
  TicketStarIcon,
  AnalyticsUpIcon,
  Video01Icon,
  CheckmarkBadgeIcon,
  UserAdd01Icon,
  PenTool03Icon,
  ShieldUserIcon,
  CheckmarkCircle02Icon,
  Loading03Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import LandingHeader from '@/components/layout/LandingHeader.vue'
import LandingFooter from '@/components/layout/LandingFooter.vue'
import { getLanding, type LandingData } from '@/services/landing.service'
import { useLocalized } from '@/composables/useLocalized'
import heroVideo from '@/assets/videos/hero-backgound.mp4'

const { t } = useI18n()
const { pick } = useLocalized()

const iconMap: Record<string, any> = {
  TicketStar: TicketStarIcon,
  AnalyticsUp: AnalyticsUpIcon,
  Video01: Video01Icon,
  CheckmarkBadge: CheckmarkBadgeIcon,
  UserAdd01: UserAdd01Icon,
  PenTool03: PenTool03Icon,
  ShieldUser: ShieldUserIcon,
}

const data = ref<LandingData | null>(null)

onMounted(async () => {
  data.value = await getLanding()
})
</script>

<template>
  <div class="min-h-screen bg-background">
    <LandingHeader />

    <main v-if="data">
      <!-- ===================== HERO (desktop: lg+) ===================== -->
      <section id="hero" class="relative hidden min-h-screen flex-col overflow-hidden text-slate-900 lg:flex">
        <!-- Video fon -->
        <video
          class="absolute inset-0 h-full w-full object-cover"
          :src="heroVideo"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
        />
        <!-- O'qilishi uchun yumshoq oq scrim -->
        <div class="absolute inset-0 bg-gradient-to-b from-white/45 via-white/5 to-transparent" />
        <div class="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-white/70 via-white/25 to-transparent" />

        <!-- Markaziy kontent -->
        <div class="container-page relative z-10 flex flex-1 flex-col">
          <div class="flex flex-1 flex-col items-center justify-center pt-24 pb-10 text-center">
            <span v-reveal class="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-slate-600 backdrop-blur-sm">
              <span class="rounded-full bg-slate-900/10 px-2 py-0.5 text-[10px] tracking-wide text-slate-700">AVTODRIVE</span>
              {{ t('hero.badge') }}
            </span>

            <h1 v-reveal="80" class="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              {{ t('hero.title') }}
            </h1>

            <p v-reveal="160" class="mx-auto mt-4 max-w-xl text-base text-slate-600">
              {{ t('hero.subtitle') }}
            </p>

            <div v-reveal="240" class="mt-7 flex items-center justify-center gap-3">
              <Button as-child class="h-11 rounded-xl px-6 text-sm shadow-lg shadow-primary/25">
                <RouterLink to="/login">
                  {{ t('hero.freeTest') }}
                  <HugeiconsIcon :icon="ArrowUpRightIcon" class="size-4" />
                </RouterLink>
              </Button>
              <Button as-child variant="outline" class="h-11 rounded-xl border-black/10 bg-white/80 px-6 text-sm text-slate-900 backdrop-blur-sm hover:bg-white">
                <RouterLink to="/login">{{ t('common.register') }}</RouterLink>
              </Button>
            </div>
          </div>

          <!-- Feature qatori -->
          <div class="border-t border-black/10">
            <div class="grid grid-cols-4 gap-px">
              <div
                v-for="(f, i) in data.heroFeatures"
                :key="f.id"
                v-reveal="i * 80"
                class="flex items-start gap-3 px-5 py-5"
              >
                <span class="grid size-9 shrink-0 place-items-center rounded-lg bg-white/70 backdrop-blur-sm">
                  <HugeiconsIcon :icon="iconMap[f.icon]" class="size-5 text-primary" />
                </span>
                <div class="text-left">
                  <p class="text-sm font-semibold">{{ pick(f.title) }}</p>
                  <p class="mt-0.5 text-xs text-slate-500">{{ pick(f.description) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Brendlar -->
        <div class="relative z-10 border-t border-black/10 bg-white/40 backdrop-blur-sm">
          <div class="container-page flex items-center justify-between py-4">
            <span v-for="b in data.brands" :key="b.id" class="text-sm font-medium text-slate-500">{{ b.name }}™</span>
          </div>
        </div>
      </section>

      <!-- ===================== HERO (mobil: <lg) ===================== -->
      <section class="relative flex min-h-svh flex-col overflow-hidden text-white lg:hidden">
        <!-- Video fon -->
        <video
          class="absolute inset-0 h-full w-full object-cover"
          :src="heroVideo"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
        />
        <!-- Pastda matn o'qilishi uchun quyuq scrim -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <!-- Kontent pastki qismda, markazda -->
        <div class="container-page relative z-10 mt-auto pb-12 pt-28 text-center">
          <div v-reveal class="flex flex-col items-center gap-2">
            <span class="rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold tracking-wide text-white backdrop-blur-sm">AVTODRIVE</span>
            <span class="text-xs font-medium text-white/80">{{ t('hero.badge') }}</span>
          </div>

          <h1 v-reveal="80" class="mx-auto mt-5 text-[1.85rem] font-bold leading-tight tracking-tight">
            {{ t('hero.title') }}
          </h1>

          <p v-reveal="160" class="mx-auto mt-3 max-w-md text-sm text-white/75">
            {{ t('hero.subtitle') }}
          </p>

          <div v-reveal="240" class="mt-7 flex flex-col gap-3">
            <Button as-child class="h-12 w-full rounded-xl text-sm shadow-lg shadow-primary/30">
              <RouterLink to="/login">
                {{ t('hero.freeTest') }}
                <HugeiconsIcon :icon="ArrowUpRightIcon" class="size-4" />
              </RouterLink>
            </Button>
            <Button as-child variant="outline" class="h-12 w-full rounded-xl border-white/25 bg-white/10 text-sm text-white backdrop-blur-sm hover:bg-white/20">
              <RouterLink to="/login">{{ t('common.register') }}</RouterLink>
            </Button>
          </div>
        </div>
      </section>

      <!-- Feature ro'yxati + brendlar (herodan tashqarida, oq fonda) -->
      <section class="bg-background lg:hidden">
        <div class="container-page py-4">
          <div
            v-for="(f, i) in data.heroFeatures"
            :key="f.id"
            v-reveal="i * 80"
            class="flex items-center gap-3 border-b border-border py-4"
          >
            <span
              class="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-card"
              :class="i === 0 ? 'border-primary/40 text-primary' : 'text-muted-foreground'"
            >
              <HugeiconsIcon :icon="iconMap[f.icon]" class="size-5" />
            </span>
            <div>
              <p class="text-sm font-semibold">{{ pick(f.title) }}</p>
              <p class="mt-0.5 text-xs text-muted-foreground">{{ pick(f.description) }}</p>
            </div>
          </div>

          <div class="no-scrollbar scroll-fade-x mt-4 flex gap-6 overflow-x-auto pb-1">
            <span v-for="b in data.brands" :key="b.id" class="shrink-0 text-sm font-medium text-muted-foreground">{{ b.name }}™</span>
          </div>
        </div>
      </section>

      <!-- ========================= HOW IT WORKS ========================= -->
      <section id="how" class="container-page py-16 sm:py-24">
        <div v-reveal class="text-center">
          <span class="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            <span class="size-1.5 rounded-full bg-primary" /> {{ t('how.badge') }}
          </span>
          <h2 class="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{{ t('how.title') }}</h2>
          <p class="mt-2 text-sm text-muted-foreground">{{ t('how.subtitle') }}</p>
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-3">
          <div
            v-for="(s, i) in data.steps"
            :key="s.id"
            v-reveal="i * 100"
            class="hover-lift relative rounded-2xl border border-border bg-card p-6 text-center hover:shadow-md"
          >
            <span class="absolute right-4 top-4 text-sm font-semibold text-muted-foreground/40">0{{ i + 1 }}</span>
            <span class="mx-auto grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <HugeiconsIcon :icon="iconMap[s.icon]" class="size-6" />
            </span>
            <h3 class="mt-4 text-base font-semibold">{{ pick(s.title) }}</h3>
            <p class="mt-1.5 text-sm text-muted-foreground">{{ pick(s.description) }}</p>
          </div>
        </div>
      </section>

      <!-- ========================= TESTIMONIAL ========================= -->
      <section class="bg-muted/40 py-16 sm:py-24">
        <div class="container-page">
          <div v-reveal class="text-center">
            <span class="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              <span class="size-1.5 rounded-full bg-primary" /> {{ t('testimonial.badge') }}
            </span>
            <h2 class="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{{ t('testimonial.title') }}</h2>
            <p class="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">{{ t('testimonial.subtitle') }}</p>
          </div>

          <div class="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-[auto_1fr_auto]">
            <img v-reveal.left :src="data.testimonial.avatar" :alt="data.testimonial.name" class="h-full max-h-56 w-full rounded-2xl object-cover md:w-44" />
            <div v-reveal="100" class="rounded-2xl border border-border bg-card p-6">
              <div>
                <p class="font-semibold">{{ data.testimonial.name }}</p>
                <p class="text-xs text-muted-foreground">{{ pick(data.testimonial.role) }}</p>
              </div>
              <p class="mt-4 text-sm leading-relaxed text-foreground/90">"{{ pick(data.testimonial.quote) }}"</p>
            </div>
            <div class="grid gap-4 md:w-40">
              <div v-for="(st, i) in data.testimonial.stats" :key="i" v-reveal.right="200 + i * 100" class="rounded-2xl border border-border bg-card p-4">
                <p class="text-xs text-muted-foreground">{{ pick(st.label) }}</p>
                <p class="mt-1 text-2xl font-bold">{{ st.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================ STATS ============================ -->
      <section id="stats" class="container-page py-16 sm:py-24">
        <div v-reveal class="text-center">
          <span class="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            <span class="size-1.5 rounded-full bg-primary" /> {{ t('stats.badge') }}
          </span>
          <h2 class="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{{ t('stats.title') }}</h2>
          <p class="mt-2 text-sm text-muted-foreground">{{ t('stats.subtitle') }}</p>
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-3">
          <div v-for="(s, i) in data.stats" :key="s.id" v-reveal.scale="i * 100" class="rounded-2xl border border-border bg-card p-6">
            <span
              class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
              :class="{
                'bg-primary/10 text-primary': s.tone === 'primary',
                'bg-emerald-500/10 text-emerald-600': s.tone === 'success',
                'bg-orange-500/10 text-orange-600': s.tone === 'orange',
              }"
            >
              <span
                class="size-1.5 rounded-full"
                :class="{
                  'bg-primary': s.tone === 'primary',
                  'bg-emerald-500': s.tone === 'success',
                  'bg-orange-500': s.tone === 'orange',
                }"
              />
              {{ pick(s.label) }}
            </span>
            <p class="mt-4 text-4xl font-bold tracking-tight">{{ s.value }}</p>
            <p class="mt-3 text-sm leading-relaxed text-muted-foreground">{{ pick(s.hint) }}</p>
          </div>
        </div>
      </section>

      <!-- ========================= PRICING + FAQ ========================= -->
      <section id="pricing" class="bg-muted/40 py-16 sm:py-24">
        <div class="container-page">
          <div v-reveal class="text-center">
            <span class="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              <span class="size-1.5 rounded-full bg-primary" /> {{ t('pricing.badge') }}
            </span>
            <h2 class="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{{ t('pricing.title') }}</h2>
            <p class="mt-2 text-sm text-muted-foreground">{{ t('pricing.subtitle') }}</p>
          </div>

          <div id="faq" class="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
            <div v-reveal class="rounded-2xl border border-border bg-card p-6">
              <p class="text-sm font-semibold">{{ pick(data.plan.name) }}</p>
              <p class="mt-1 text-xs text-muted-foreground">{{ pick(data.plan.description) }}</p>
              <div class="mt-5 flex items-end gap-1.5">
                <span class="text-3xl font-bold tracking-tight">{{ data.plan.price }}</span>
                <span class="pb-1 text-sm text-muted-foreground">/{{ pick(data.plan.period) }}</span>
              </div>
              <ul class="mt-5 space-y-2.5">
                <li v-for="(f, i) in data.plan.features" :key="i" v-reveal="i * 60" class="flex items-start gap-2 text-sm text-foreground/90">
                  <HugeiconsIcon :icon="CheckmarkCircle02Icon" class="mt-0.5 size-4 shrink-0 text-primary" />
                  {{ pick(f) }}
                </li>
              </ul>
              <Button as-child class="mt-6 h-11 w-full rounded-xl">
                <RouterLink to="/login">
                  {{ pick(data.plan.cta) }}
                  <HugeiconsIcon :icon="ArrowUpRightIcon" class="size-4" />
                </RouterLink>
              </Button>
            </div>

            <Accordion type="single" collapsible class="w-full space-y-3">
              <AccordionItem
                v-for="(q, i) in data.faqs"
                :key="q.id"
                :value="q.id"
                v-reveal="i * 70"
                class="rounded-xl border border-border bg-card px-4 shadow-sm transition-colors data-[state=open]:border-primary/30"
              >
                <AccordionTrigger class="text-left text-sm hover:no-underline">{{ pick(q.question) }}</AccordionTrigger>
                <AccordionContent class="text-sm text-muted-foreground">{{ pick(q.answer) }}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </main>

    <div v-else class="flex h-[70vh] items-center justify-center">
      <HugeiconsIcon :icon="Loading03Icon" class="size-6 animate-spin text-muted-foreground" />
    </div>

    <LandingFooter />
  </div>
</template>
