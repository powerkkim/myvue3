import PrimeVue from 'primevue/config'; // here
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css'; //icons

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './stores';

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(PrimeVue, {
	theme: {
		preset: Aura,
		options: {
			prefix: 'p',
			darkModeSelector: '.my-app-dark',
			cssLayer: false,
		},
	},
});
app.use(ToastService);
app.mount('#app');
