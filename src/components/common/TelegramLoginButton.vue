<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { TelegramIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Button } from '@/components/ui/button'
import type { TelegramAuthData } from '@/services/auth.service'

const emit = defineEmits<{ (e: 'auth', data: TelegramAuthData): void }>()

/** BotFather'dan olingan bot username (masalan: avtodrive_bot). */
const botUsername = import.meta.env.VITE_TELEGRAM_BOT as string | undefined

const container = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!botUsername) return

  // Widget `data-onauth` global funksiyani chaqiradi — uni Vue emit'ga bog'laymiz
  ;(window as any).onTelegramAuth = (user: TelegramAuthData) => emit('auth', user)

  // Telegram Login Widget skriptini dinamik joylashtiramiz
  const script = document.createElement('script')
  script.src = 'https://telegram.org/js/telegram-widget.js?22'
  script.async = true
  script.setAttribute('data-telegram-login', botUsername)
  script.setAttribute('data-size', 'large')
  script.setAttribute('data-radius', '12')
  script.setAttribute('data-request-access', 'write')
  script.setAttribute('data-onauth', 'onTelegramAuth(user)')
  container.value?.appendChild(script)
})

// Demo rejim (bot sozlanmagan): soxta Telegram foydalanuvchisi bilan oqimni sinash
function demoLogin() {
  emit('auth', {
    id: 123456789,
    first_name: 'Demo',
    last_name: 'User',
    username: 'demo_user',
    photo_url: 'https://i.pravatar.cc/120?img=68',
    auth_date: Math.floor(Date.now() / 1000),
    hash: 'demo-hash',
  })
}
</script>

<template>
  <!-- Bot sozlangan bo'lsa — rasmiy Telegram widget -->
  <div v-if="botUsername" ref="container" class="flex justify-center" />

  <!-- Aks holda — demo tugma (mock backend bilan oqim to'liq ishlaydi) -->
  <Button v-else variant="outline" class="h-11 w-full rounded-xl text-sm" @click="demoLogin">
    <HugeiconsIcon :icon="TelegramIcon" class="size-5 text-[#229ED9]" />
    <slot />
  </Button>
</template>
