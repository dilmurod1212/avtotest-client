<script setup lang="ts">
import Logo from '@/components/common/Logo.vue'
import LangSwitcher from '@/components/common/LangSwitcher.vue'

defineProps<{
  /** Yuqori o'ng burchakdagi savol matni */
  altQuestion?: string
  altLabel?: string
  altTo?: string
}>()
</script>

<template>
  <div class="grid min-h-screen lg:grid-cols-2">
    <!-- Chap: forma paneli -->
    <div class="flex flex-col bg-background px-5 py-6 sm:px-10">
      <header class="flex items-center justify-between gap-2">
        <Logo />
        <div class="flex items-center gap-2">
          <LangSwitcher />
          <p v-if="altQuestion" class="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
            {{ altQuestion }}
            <RouterLink
              :to="altTo ?? '/login'"
              class="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
            >
              {{ altLabel }}
            </RouterLink>
          </p>
        </div>
      </header>

      <div class="flex flex-1 items-center justify-center py-10">
        <div class="w-full max-w-sm">
          <slot />
        </div>
      </div>

      <footer class="text-xs text-muted-foreground">
        <span>© 2026 AvtoDrive</span>
      </footer>
    </div>

    <!-- O'ng: avtomobil rasmi (faqat lg+) -->
    <div class="relative hidden lg:block">
      <img
        src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=70"
        alt="Avtomobil"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#0d1720]/60 via-transparent to-transparent" />
    </div>
  </div>
</template>
