import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'

const pinia = createPinia();
pinia.use(persistedstate);

const app = createApp(App);
app.use(pinia);
app.mount('#app')
