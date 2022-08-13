import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './mock/'
import '../public/css/reset.styl'
const app = createApp(App)
app.use(router).mount('#app')
