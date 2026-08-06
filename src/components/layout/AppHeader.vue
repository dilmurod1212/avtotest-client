<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  Crown02Icon,
  StarIcon,
  Notification03Icon,
  ArrowDown01Icon,
  Menu01Icon,
  Cancel01Icon,
  Logout03Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import Logo from '@/components/common/Logo.vue'
import LangSwitcher from '@/components/common/LangSwitcher.vue'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { t } = useI18n()
const { user, logout } = useAuth()

const links = computed(() => [
  { label: t('common.home'), to: '/dashboard' },
  { label: t('common.services'), to: '/tests' },
  { label: t('common.settings'), to: '/dashboard' },
])

const open = ref(false)

function onLogout() {
  logout()
  router.push('/')
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
    <div class="container-page flex h-16 items-center justify-between gap-4">
      <div class="flex items-center gap-8">
        <Logo />
        <nav class="hidden items-center gap-6 md:flex">
          <RouterLink
            v-for="l in links"
            :key="l.label"
            :to="l.to"
            class="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {{ l.label }}
          </RouterLink>
        </nav>
      </div>

      <div class="flex items-center gap-2 sm:gap-3">
        <LangSwitcher />
        <Button variant="secondary" class="hidden h-9 rounded-lg bg-primary/10 px-3 text-primary hover:bg-primary/15 sm:inline-flex">
          <HugeiconsIcon :icon="Crown02Icon" class="size-4" />
          {{ t('common.vip') }}
        </Button>
        <button class="hidden size-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted sm:grid" :aria-label="t('common.saved')">
          <HugeiconsIcon :icon="StarIcon" class="size-5" />
        </button>
        <button class="grid size-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted" :aria-label="t('common.notifications')">
          <HugeiconsIcon :icon="Notification03Icon" class="size-5" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger class="flex items-center gap-1.5 rounded-lg outline-none">
            <Avatar class="size-9">
              <AvatarImage :src="user?.avatar ?? ''" :alt="user?.name" />
              <AvatarFallback>{{ (user?.name ?? 'A').charAt(0) }}</AvatarFallback>
            </Avatar>
            <HugeiconsIcon :icon="ArrowDown01Icon" class="hidden size-4 text-muted-foreground sm:block" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-56">
            <DropdownMenuLabel>
              <p class="text-sm font-medium">{{ user?.name }}</p>
              <p class="text-xs font-normal text-muted-foreground">{{ user?.phone }}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem @select="onLogout">
              <HugeiconsIcon :icon="Logout03Icon" class="size-4" />
              {{ t('common.logout') }}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          class="grid size-9 place-items-center rounded-lg text-foreground md:hidden"
          :aria-label="t('common.menu')"
          @click="open = !open"
        >
          <HugeiconsIcon :icon="open ? Cancel01Icon : Menu01Icon" class="size-6" />
        </button>
      </div>
    </div>

    <div v-if="open" class="border-t border-border md:hidden">
      <nav class="container-page flex flex-col py-2">
        <RouterLink
          v-for="l in links"
          :key="l.label"
          :to="l.to"
          class="py-2.5 text-sm text-muted-foreground"
          @click="open = false"
        >
          {{ l.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
