import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Welcome from './views/Welcome.vue'
import Dashboard from './components/Dashboard.vue'
import Loans from './components/Loans.vue'
import Bodabodas from './components/Bodabodas.vue'
import Agents from './components/Agents.vue'
import Expenses from './components/Expenses.vue'
import Savings from './components/Savings.vue'
import store from './store/store'

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
                    component: Dashboard,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'agents',
                    name: 'home.agents',
                    component: Agents,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'loans',
                    name: 'home.loans',
                    component: Loans,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'bodabodas',
                    name: 'home.bodabodas',
                    component: Bodabodas,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'expenses',
                    name: 'home.expenses',
                    component: Expenses,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'savings',
                    name: 'home.savings',
                    component: Savings,
                    meta: {
                        requiresAuth: true
                    }
                },
            ]
        }

    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.state.isLoggedIn) {
            next()
            return
        }
        next('/')
    } else {
        next()
    }
})

export default router;
