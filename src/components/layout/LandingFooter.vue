<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Logo from '@/components/common/Logo.vue'

const { t } = useI18n()
</script>

<template>
  <footer class="border-t border-border bg-background">
    <div class="container-page flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
      <div class="space-y-1">
        <Logo />
        <p class="text-xs text-muted-foreground">{{ t('footer.rights') }}</p>
      </div>
      <nav class="flex flex-wrap gap-x-6 gap-y-2">
        <a href="#" class="text-sm text-muted-foreground transition-colors hover:text-foreground">{{ t('footer.cookie') }}</a>
        <a href="#" class="text-sm text-muted-foreground transition-colors hover:text-foreground">{{ t('footer.privacy') }}</a>
        <a href="#" class="text-sm text-muted-foreground transition-colors hover:text-foreground">{{ t('footer.terms') }}</a>
      </nav>
    </div>
  </footer>
</template>
