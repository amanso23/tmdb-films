import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router'; 
import pinia from './store/store';

createApp(App).use(router).use(pinia).mount('#app'); // Use pinia instance
