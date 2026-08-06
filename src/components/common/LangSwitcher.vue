<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { GlobalIcon, ArrowDown01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { localeOptions, setLocale, type AppLocale } from '@/i18n'

withDefaults(defineProps<{ light?: boolean }>(), { light: false })

const { locale } = useI18n()

function change(l: AppLocale) {
  setLocale(l)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      class="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm outline-none transition-colors"
      :class="light ? 'text-white/80 hover:bg-white/10' : 'text-muted-foreground hover:bg-muted'"
    >
      <HugeiconsIcon :icon="GlobalIcon" class="size-4" />
      <span class="uppercase">{{ locale }}</span>
      <HugeiconsIcon :icon="ArrowDown01Icon" class="size-3.5 opacity-70" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="min-w-36">
      <DropdownMenuItem
        v-for="opt in localeOptions"
        :key="opt.value"
        :data-active="locale === opt.value"
        class="data-[active=true]:bg-muted"
        @select="change(opt.value)"
      >
        <span class="text-base">{{ opt.flag }}</span>
        {{ opt.label }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
