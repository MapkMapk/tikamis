import './assets/scss/main.scss';
import 'virtual:svg-icons-register';
import VueTheMask from 'vue-the-mask'
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import VueClickOutside from 'vue-click-outside';

import VueApexCharts from 'vue3-apexcharts';



import App from './App.vue';
import router from './router/index.js';

const app = createApp(App);
app.use(VueTheMask)
app.directive('click-outside', VueClickOutside);
// Pinia глобальное хранилище
app.use(createPinia().use(piniaPluginPersistedstate));

app.use(router);

// Регистрация VueApexCharts как глобального компонента
app.component('apexchart', VueApexCharts);

app.mount('#app');
