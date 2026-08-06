import type { Directive } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

/**
 * v-reveal — element ko'rinishga kirganda yumshoq "fade/slide-up" animatsiyasi.
 * @vueuse/core'ning IntersectionObserver'idan foydalanadi (yengil, qo'shimcha kutubxonasiz).
 *
 * Ishlatish:
 *   <section v-reveal>...</section>
 *   <div v-reveal="120">...</div>   // 120ms kechikish bilan
 */

const stops = new WeakMap<HTMLElement, () => void>()

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    // Foydalanuvchi animatsiyani kamaytirishni tanlagan bo'lsa — o'tkazib yuboramiz
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const delay = binding.value ?? 0
    el.classList.add('reveal')
    // Yo'nalish variantlari: v-reveal.left / .right / .scale
    if (binding.modifiers.left) el.classList.add('reveal-left')
    else if (binding.modifiers.right) el.classList.add('reveal-right')
    else if (binding.modifiers.scale) el.classList.add('reveal-scale')
    el.style.transitionDelay = `${delay}ms`

    const { stop } = useIntersectionObserver(
      el,
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add('reveal-in')
          stops.get(el)?.()
        }
      },
      { threshold: 0.12 },
    )
    stops.set(el, stop)
  },
  unmounted(el) {
    stops.get(el)?.()
    stops.delete(el)
  },
}

export default vReveal
