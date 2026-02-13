import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from './lib/queryClient'

createApp(App).use(createPinia()).use(VueQueryPlugin, { queryClient }).mount('#app')
