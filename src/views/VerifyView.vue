<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'
import { SquareLock02Icon, Loading03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Button } from '@/components/ui/button'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import { verifyCode, requestCode } from '@/services/auth.service'
import { useAuth } from '@/composables/useAuth'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { setSession } = useAuth()

const phone = (route.query.phone as string) || '+998 90 123 45 67'
const digits = ref<string[]>(['', '', '', ''])
const inputs = ref<HTMLInputElement[]>([])
const loading = ref(false)
const resendIn = ref(60)

const code = computed(() => digits.value.join(''))
const isComplete = computed(() => code.value.length === 4)

function setRef(el: any, i: number) {
  if (el) inputs.value[i] = el
}

function onInput(e: Event, i: number) {
  const val = (e.target as HTMLInputElement).value.replace(/\D/g, '')
  digits.value[i] = val.slice(-1)
  if (val && i < 3) inputs.value[i + 1]?.focus()
  if (isComplete.value) onSubmit()
}

function onKeydown(e: KeyboardEvent, i: number) {
  if (e.key === 'Backspace' && !digits.value[i] && i > 0) {
    inputs.value[i - 1]?.focus()
  }
}

function onPaste(e: ClipboardEvent) {
  const pasted = (e.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, 4)
  if (!pasted) return
  e.preventDefault()
  digits.value = pasted.padEnd(4, '').split('').slice(0, 4)
  inputs.value[Math.min(pasted.length, 3)]?.focus()
  if (pasted.length === 4) onSubmit()
}

async function onSubmit() {
  if (!isComplete.value || loading.value) return
  loading.value = true
  try {
    const { token, user } = await verifyCode(phone, code.value)
    setSession(token, user)
    toast.success(t('auth.loginSuccess'))
    router.push({ name: 'dashboard' })
  } catch (e: any) {
    toast.error(e?.message ?? t('auth.wrongCode'))
    digits.value = ['', '', '', '']
    inputs.value[0]?.focus()
  } finally {
    loading.value = false
  }
}

async function resend() {
  if (resendIn.value > 0) return
  await requestCode(phone)
  toast.success(t('auth.codeSent'), { description: t('auth.demoCode') })
  startTimer()
}

function startTimer() {
  resendIn.value = 60
  const id = setInterval(() => {
    resendIn.value -= 1
    if (resendIn.value <= 0) clearInterval(id)
  }, 1000)
}

onMounted(() => {
  inputs.value[0]?.focus()
  startTimer()
})
</script>

<template>
  <AuthLayout
    :alt-question="t('auth.noAccount')"
    :alt-label="t('common.register')"
    alt-to="/login"
  >
    <div class="text-center">
      <span class="mx-auto grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
        <HugeiconsIcon :icon="SquareLock02Icon" class="size-6" />
      </span>
      <h1 class="mt-4 text-xl font-bold">{{ t('auth.verifyTitle') }}</h1>
      <p class="mt-1 text-sm text-muted-foreground">
        <i18n-t keypath="auth.verifySubtitle" tag="span">
          <template #phone><span class="font-medium text-foreground">{{ phone }}</span></template>
        </i18n-t>
      </p>
    </div>

    <div class="mt-8 flex justify-center gap-3" @paste="onPaste">
      <input
        v-for="(_, i) in 4"
        :key="i"
        :ref="(el) => setRef(el, i)"
        :value="digits[i]"
        type="text"
        inputmode="numeric"
        maxlength="1"
        class="size-14 rounded-xl border border-input bg-background text-center text-2xl font-semibold outline-none transition-colors focus:border-primary focus:ring-3 focus:ring-primary/20"
        @input="(e) => onInput(e, i)"
        @keydown="(e) => onKeydown(e, i)"
      />
    </div>

    <Button
      :disabled="!isComplete || loading"
      class="mt-7 h-11 w-full rounded-xl text-sm"
      @click="onSubmit"
    >
      <HugeiconsIcon v-if="loading" :icon="Loading03Icon" class="size-4 animate-spin" />
      <span v-else>{{ t('auth.verify') }}</span>
    </Button>

    <div class="mt-5 text-center text-sm">
      <p class="text-muted-foreground">{{ t('auth.resendQuestion') }}</p>
      <button
        type="button"
        class="mt-1 font-medium"
        :class="resendIn > 0 ? 'text-muted-foreground' : 'text-primary hover:underline'"
        :disabled="resendIn > 0"
        @click="resend"
      >
        {{ t('auth.resend') }}
        <span v-if="resendIn > 0">({{ resendIn }}s)</span>
      </button>
    </div>
  </AuthLayout>
</template>
