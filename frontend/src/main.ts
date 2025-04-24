import './assets/main.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { inject } from '@vercel/analytics'

const app = createApp(App)

app.use(router)

// Initialize Vercel Analytics
inject()

app.mount('#app')
