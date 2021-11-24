import { createApp } from 'vue'
import App from './AppServer.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { SetupCalendar, Calendar, DatePicker } from 'v-calendar'

createApp(App).use(router)
// Setup the plugin with optional defaults
.use(SetupCalendar, {})
// Use the components
.component('Calendar', Calendar)
.component('DatePicker', DatePicker)
.mount('#app')
