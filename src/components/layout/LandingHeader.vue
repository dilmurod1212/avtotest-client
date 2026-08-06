<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollLock, useWindowScroll } from '@vueuse/core'
import { Menu01Icon, Cancel01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Button } from '@/components/ui/button'
import Logo from '@/components/common/Logo.vue'
import LangSwitcher from '@/components/common/LangSwitcher.vue'

const { t } = useI18n()
const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 40)

const links = computed(() => [
  { label: t('nav.home'), href: '#hero' },
  { label: t('nav.howItWorks'), href: '#how' },
  { label: t('nav.tests'), href: '#stats' },
  { label: t('nav.pricing'), href: '#pricing' },
  { label: t('nav.faq'), href: '#faq' },
])

const open = ref(false)

// Menyu ochilganda body scroll'ni bloklaymiz
const bodyScrollLocked = useScrollLock(document.body)
watch(open, (v) => {
  bodyScrollLocked.value = v
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 transition-colors duration-300"
    :class="scrolled || open ? 'border-b border-border bg-background/85 backdrop-blur-md' : 'bg-transparent'"
  >
    <div class="container-page flex h-16 items-center justify-between">
      <Logo />

      <nav class="hidden items-center gap-7 md:flex">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="text-sm text-foreground/70 transition-colors hover:text-foreground"
        >
          {{ l.label }}
        </a>
      </nav>

      <div class="hidden items-center gap-2 md:flex">
        <LangSwitcher />
        <Button as-child variant="outline" class="h-9 rounded-lg px-4">
          <RouterLink to="/login">{{ t('common.login') }}</RouterLink>
        </Button>
      </div>

      <button
        class="grid size-9 place-items-center rounded-lg text-foreground md:hidden"
        :aria-label="t('common.menu')"
        @click="open = !open"
      >
        <HugeiconsIcon :icon="open ? Cancel01Icon : Menu01Icon" class="size-6" />
      </button>
    </div>

  </header>

  <!-- Mobil menyu (to'liq ekran) — Teleport orqali body'ga -->
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 top-16 z-30 flex flex-col overflow-y-auto border-t border-border bg-background md:hidden"
      >
        <nav class="container-page flex flex-1 flex-col py-4">
          <a
            v-for="l in links"
            :key="l.href"
            :href="l.href"
            class="border-b border-border py-4 text-base font-medium text-foreground/80"
            @click="open = false"
          >
            {{ l.label }}
          </a>
          <div class="py-4"><LangSwitcher /></div>
          <Button as-child class="mt-auto h-12 w-full text-sm">
            <RouterLink to="/login" @click="open = false">{{ t('common.login') }}</RouterLink>
          </Button>
        </nav>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
