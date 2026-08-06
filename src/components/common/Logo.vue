<script setup lang="ts">
import logoUrl from '@/assets/images/logo.svg'

withDefaults(
  defineProps<{
    /** true bo'lsa oq matnli variant (qora fonlar uchun) */
    light?: boolean
    class?: string
  }>(),
  { light: false },
)
</script>

<template>
  <RouterLink to="/" class="inline-flex items-center gap-2" :class="$props.class">
    <img :src="logoUrl" alt="AvtoDrive" class="size-6 shrink-0" />
    <span
      class="text-lg font-semibold tracking-tight"
      :class="light ? 'text-white' : 'text-foreground'"
    >
      AvtoDrive
    </span>
  </RouterLink>
</template>
