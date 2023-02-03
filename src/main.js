import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import axios from 'axios'
import './assets/tailwind.css'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
axios.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${ token }`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
const app = createApp(App)

app.use(router)

app.mount('#app')