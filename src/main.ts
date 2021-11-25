import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import SetupCalendar, { Calendar, DatePicker } from 'v-calendar'

createApp(App).use(store)
    .use(router)
    .use(SetupCalendar, {})
    .component('Calendar', Calendar)
    .component('DatePicker', DatePicker)
    .mount('#app')
