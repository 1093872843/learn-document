import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import buried from 'buried_point_common_vite'
import 'element-plus/dist/index.css'
import router from './router'
const app = createApp(App)
// app.use(buried)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
