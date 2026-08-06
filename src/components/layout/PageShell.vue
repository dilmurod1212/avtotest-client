<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ArrowLeft01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import LandingFooter from '@/components/layout/LandingFooter.vue'

defineProps<{
  breadcrumb: string
  title: string
  subtitle?: string
}>()

const { t } = useI18n()
</script>

<template>
  <div class="flex min-h-screen flex-col bg-muted/30">
    <AppHeader />

    <main class="container-page flex-1 py-6 sm:py-10">
      <!-- Breadcrumb -->
      <nav class="flex items-center justify-center gap-1.5 text-sm">
        <RouterLink
          to="/dashboard"
          class="inline-flex items-center gap-1 rounded-md bg-card px-2.5 py-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          <HugeiconsIcon :icon="ArrowLeft01Icon" class="size-3.5" />
          {{ t('common.home') }}
        </RouterLink>
        <span class="text-muted-foreground/50">»</span>
        <span class="inline-flex items-center gap-1.5 rounded-md bg-card px-2.5 py-1 font-medium">
          <span class="size-1.5 rounded-full bg-primary" />
          {{ breadcrumb }}
        </span>
      </nav>

      <!-- Header -->
      <div v-reveal class="mx-auto mt-6 max-w-2xl text-center">
        <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">{{ title }}</h1>
        <p v-if="subtitle" class="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          {{ subtitle }}
        </p>
        <slot name="header-extra" />
      </div>

      <div class="mt-8">
        <slot />
      </div>
    </main>

    <LandingFooter />
  </div>
</template>
