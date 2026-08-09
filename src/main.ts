import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { setupMock } from './lib/mock'
import { vReveal } from './directives/reveal'

import 'vue-sonner/style.css'
import './assets/index.css'

// Mock API adapterni yoqamiz (real backend uchun VITE_API_MOCK=false)
setupMock()

createApp(App)
  .use(router)
  .use(i18n)
  .directive('reveal', vReveal)
  .mount('#app')
