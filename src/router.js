import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Welcome from './views/Welcome.vue'
import Dashboard from './components/Dashboard.vue'
import Loans from './components/Loans.vue'
import Bodabodas from './components/Bodabodas.vue'
import Agents from './components/Agents.vue'

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
            component: Welcome,
            children: [
                {
                    path: '',
                    name: 'home.dashboard',
                    component: Dashboard
                },
                {
                    path: 'agents',
                    name: 'home.agents',
                    component: Agents
                },
                {
                    path: 'loans',
                    name: 'home.loans',
                    component: Loans
                },
                {
                    path: 'bodabodas',
                    name: 'home.bodabodas',
                    component: Bodabodas
                },
            ]
        }

    ]
})

export default router;
