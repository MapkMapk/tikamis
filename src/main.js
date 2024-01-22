import './assets/scss/main.scss';
import 'virtual:svg-icons-register';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router/index.js';

const app = createApp(App);

// Pinia глобальное хранилище
const pinia = createPinia();
app.use(pinia);
pinia.use(piniaPluginPersistedstate);

app.use(router);

app.mount('#app');
