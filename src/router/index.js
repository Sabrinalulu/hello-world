import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home'
import About from '../views/About'
import Portal from '../views/Portal'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },    
    {
        path: '/about',
        name: 'About',
        component: About
    },    
    {
        path: '/portal',
        name: 'Portal',
        component: Portal
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router