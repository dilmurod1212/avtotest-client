<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'
import {
  UserCircleIcon,
  TelegramIcon,
  ArrowRight01Icon,
  Loading03Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import { requestCode } from '@/services/auth.service'

const router = useRouter()
const { t } = useI18n()

const phone = ref('')
const remember = ref(false)
const loading = ref(false)

const isValid = computed(() => phone.value.replace(/\D/g, '').length >= 9)

function formatPhone(e: Event) {
  const digits = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 9)
  const parts = [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7), digits.slice(7, 9)]
  phone.value = parts.filter(Boolean).join(' ')
}

async function onSubmit() {
  if (!isValid.value || loading.value) return
  loading.value = true
  const fullPhone = '+998 ' + phone.value
  try {
    await requestCode(fullPhone)
    toast.success(t('auth.codeSent'), { description: t('auth.demoCode') })
    router.push({ name: 'verify', query: { phone: fullPhone, remember: String(remember.value) } })
  } catch (e: any) {
    toast.error(e?.message ?? 'Error')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthLayout
    :alt-question="t('auth.noAccount')"
    :alt-label="t('common.register')"
    alt-to="/login"
  >
    <div class="text-center">
      <span class="mx-auto grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
        <HugeiconsIcon :icon="UserCircleIcon" class="size-6" />
      </span>
      <h1 class="mt-4 text-xl font-bold">{{ t('auth.loginTitle') }}</h1>
      <p class="mt-1 text-sm text-muted-foreground">{{ t('auth.loginSubtitle') }}</p>
    </div>

    <!-- Telegram -->
    <Button
      variant="outline"
      class="mt-6 h-11 w-full rounded-xl text-sm"
      @click="toast.info(t('auth.telegramDemo'))"
    >
      <HugeiconsIcon :icon="TelegramIcon" class="size-5 text-[#229ED9]" />
      {{ t('auth.telegram') }}
    </Button>

    <div class="my-5 flex items-center gap-3">
      <span class="h-px flex-1 bg-border" />
      <span class="text-xs text-muted-foreground">{{ t('auth.or') }}</span>
      <span class="h-px flex-1 bg-border" />
    </div>

    <form class="space-y-4" @submit.prevent="onSubmit">
      <div class="space-y-1.5">
        <Label for="phone" class="text-sm">{{ t('auth.phone') }} <span class="text-destructive">*</span></Label>
        <div class="flex items-stretch gap-2">
          <span
            class="inline-flex h-11 items-center gap-1.5 rounded-xl border border-input bg-background px-3 text-sm"
          >
            🇺🇿 +998
          </span>
          <Input
            id="phone"
            :model-value="phone"
            inputmode="numeric"
            placeholder="(00) 000-00-00"
            class="h-11 flex-1 rounded-xl text-sm"
            @input="formatPhone"
          />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <label class="flex items-center gap-2 text-sm text-muted-foreground">
          <Checkbox v-model="remember" />
          {{ t('auth.remember') }}
        </label>
        <button type="button" class="text-sm font-medium text-primary hover:underline">
          {{ t('auth.forgot') }}
        </button>
      </div>

      <Button type="submit" :disabled="!isValid || loading" class="h-11 w-full rounded-xl text-sm">
        <HugeiconsIcon v-if="loading" :icon="Loading03Icon" class="size-4 animate-spin" />
        <template v-else>
          {{ t('common.login') }}
          <HugeiconsIcon :icon="ArrowRight01Icon" class="size-4" />
        </template>
      </Button>
    </form>
  </AuthLayout>
</template>
