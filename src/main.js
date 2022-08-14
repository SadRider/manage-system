import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './mock/'
import '../public/css/reset.styl'
import { createPinia } from 'pinia'
const app = createApp(App)
app.use(router).use(createPinia()).mount('#app')
