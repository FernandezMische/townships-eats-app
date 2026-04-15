// Frontend/src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import your router
import './assets/css/main.css'; // Import your global CSS
import { createPinia } from 'pinia'

const app = createApp(App);

app.use(router); // Use the router
app.use(createPinia()) // Use Pinia for state management
app.mount('#app');