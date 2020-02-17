import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Welcome from './views/Welcome.vue'

Vue.use(Router)


const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            name: 'home',
            component: Welcome
        }
                
    ]
})

export default router;
