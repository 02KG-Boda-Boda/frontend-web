import axiosInstance from './axios_setup'
import axios from 'axios'

export const actions = {
    async login({ commit }, data) {
        commit('IS_LOADING', true)
        await axiosInstance
            .post('/login/', data)
            .then(res => {
                const token = res.data.token
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                commit('LOGIN_USER', res.data.user)
                commit('IS_LOADING', false)
            })
            .catch(err => {
                commit('LOGIN_ERROR', err.response.data)
                commit('IS_LOADING', false)
            })
    },
    logout({ commit }) {
        return new Promise(resolve => {
            commit('LOGOUT')
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    },
    async addAgent({ commit }, data) {
        commit('POST_AGENT_LOADING', true)
        await axiosInstance
            .post('/signup/', data)
            .then(res => {
                commit('POST_AGENT', res.data.user)
                commit('POST_AGENT_LOADING', false)
            })
            .catch(err => {
                commit('POST_AGENT_ERROR', err.response.data)
                commit('POST_AGENT_LOADING', false)
            })
    },
    async fetchAgents({ commit }) {
        
        commit('AGENTS_LOADING', true)
        await axiosInstance
            .get('/agents/')
            .then(res => {
                commit('FETCH_AGENTS', res.data.agents)
                commit('AGENTS_LOADING', false)
            })
            .catch(err => {
                commit('AGENTS_ERROR', err.response.data)
                commit('AGENTS_LOADING', false)
            })
    },
    async deleteAgents({ commit }, id) {
        await axiosInstance
            .delete('/users/' + id)
            .then(() => {
                commit('DELETE_AGENT', true)
            })
            .catch(err => {
                commit('DELETE_AGENT_ERROR', err.response.data)
                commit('DELETE_AGENT', false)
            })
    },
    async updateAgents({ commit }, payload) {
        await axiosInstance
            .put('/users/' + payload.id, payload.formData)
            .then(() => {
                commit('UPDATE_AGENT', true)
            })
            .catch(err => {
                commit('UPDATE_AGENT_ERROR', err.response.error)
                commit('UPDATE_AGENT', false)
            })
    },
    async addBodaboda({ commit }, payload) {
        await axiosInstance
            .post('/bodabodas/', payload)
            .then(() => {
                commit('ADD_RIDER', true)
            })
            .catch(err => {
                commit('ADD_RIDER_ERROR', err.response.error)
                commit('ADD_RIDER', false)
            })
    },
    async fetchRiders({ commit }) {
        commit('RIDERS_LOADING', true)
        await axiosInstance
            .get('/bodabodas/')
            .then(res => {
                commit('FETCH_RIDERS', res.data.riders)
                commit('RIDERS_LOADING', false)
            })
            .catch(err => {
                commit('RIDERS_ERROR', err.response.error)
                commit('RIDERS_LOADING', false)
            })
    },
    async deleteRiders({ commit }, id) {
        await axiosInstance
            .delete('/bodabodas/' + id)
            .then(() => {
                commit('DELETE_BODABODA', true)
            })
            .catch(err => {
                commit('DELETE_BODABODA_ERROR', err.response.error)
                commit('DELETE_BODABODA', false)
            })
    },
    async updateBodaboda({ commit }, payload) {
        await axiosInstance
            .put('/bodabodas/' + payload.id, payload.formData)
            .then(() => {
                commit('UPDATE_BODABODA', true)
            })
            .catch(err => {
                commit('UPDATE_BODABODA_ERROR', err.response.error)
                commit('UPDATE_BODABODA', false)
            })
    },
    async addLoan({ commit }, payload) {
        await axiosInstance
            .post('/loans/', payload)
            .then(() => {
                commit('ADD_LOAN', true)
            })
            .catch(err => {
                commit('ADD_LOAN_ERROR', err.response.error)
                commit('ADD_LOAN', false)
            })
    },
    async fetchLoans({ commit }) {
        commit('LOANS_LOADING', true)
        await axiosInstance
            .get('/loans/')
            .then(res => {
                commit('FETCH_LOANS', res.data.loans)
                commit('LOANS_LOADING', false)
            })
            .catch(err => {
                commit('LOANS_ERROR', err.response.error)
                commit('LOANS_LOADING', false)
            })
    },
    async updateLoan({ commit }, payload) {
        await axiosInstance
            .put('/loans/'+payload.id, payload)
            .then(() => {
                commit('UPDATE_LOAN', true)
            })
            .catch(err => {
                commit('UPDATE_LOAN_ERROR', err.response.error)
                commit('UPDATE_LOAN', false)
            })
    },
    async payLoan({ commit }, payload) {
        await axiosInstance
            .put('/payloan/'+payload.id, payload)
            .then(() => {
                commit('LOAN_PAYMENT', true)
            })
            .catch(err => {
                commit('LOAN_PAYMENT_ERROR', err.response.error)
                commit('LOAN_PAYMENT', false)
            })
    },
    async countAgents({ commit }) {
        commit('COUNT_AGENTS_LOADING', true)
        await axiosInstance
            .get('/statistics/agents_count')
            .then(res => {
                commit('COUNT_AGENTS', res.data.agent_count)
                commit('COUNT_AGENTS_LOADING', false)
            })
            .catch(err => {
                commit('COUNT_AGENTS_ERROR', err.response.error)
                commit('COUNT_AGENTS_LOADING', false)
            })
    },
    async countRiders({ commit }) {
        commit('COUNT_RIDERS_LOADING', true)
        await axiosInstance
            .get('/statistics/bodabodas_count')
            .then(res => {
                commit('COUNT_RIDERS', res.data.bodaboda_count)
                commit('COUNT_RIDERS_LOADING', false)
            })
            .catch(err => {
                commit('COUNT_RIDERS_ERROR', err.response.error)
                commit('COUNT_RIDERS_LOADING', false)
            })
    },
    async countLoans({ commit }) {
        commit('COUNT_LOANS_LOADING', true)
        await axiosInstance
            .get('/statistics/loans_count')
            .then(res => {
                commit('COUNT_LOANS', res.data.loan_count)
                commit('COUNT_LOANS_LOADING', false)
            })
            .catch(err => {
                commit('COUNT_LOANS_ERROR', err.response.error)
                commit('COUNT_LOANS_LOADING', false)
            })
    },
    async paid({ commit }) {
        commit('PAID_LOADING', true)
        await axiosInstance
            .get('/statistics/paid_trend')
            .then(res => {
                commit('PAID', res.data.results)
                commit('PAID_LOADING', false)
            })
            .catch(err => {
                commit('PAID_ERROR', err.response.error)
                commit('PAID_LOADING', false)
            })
    },
    async unpaid({ commit }) {
        commit('UNPAID_LOADING', true)
        await axiosInstance
            .get('/statistics/unpaid_trend')
            .then(res => {
                commit('UNPAID', res.data.results)
                commit('UNPAID_LOADING', false)
            })
            .catch(err => {
                commit('UNPAID_ERROR', err.response.error)
                commit('UNPAID_LOADING', false)
            })
    },
    async addExpense({ commit }, payload) {
        await axiosInstance
            .post('/expenses/', payload)
            .then(() => {
                commit('ADD_EXPENSE', true)
            })
            .catch(err => {
                commit('ADD_EXPENSE_ERROR', err.response.error)
                commit('ADD_EXPENSE', false)
            })
    },
    async fetchExpenses({ commit }) {
        commit('EXPENSES_LOADING', true)
        await axiosInstance
            .get('/expenses/')
            .then(res => {
                commit('FETCH_EXPENSES', res.data)
                commit('EXPENSES_LOADING', false)
            })
            .catch(err => {
                commit('EXPENSES_ERROR', err.response.error)
                commit('EXPENSES_LOADING', false)
            })
    },
    async updateExpense({ commit }, payload) {
        await axiosInstance
            .put('/expenses/'+payload.id, payload)
            .then(() => {
                commit('UPDATE_EXPENSE', true)
            })
            .catch(err => {
                commit('UPDATE_EXPENSE_ERROR', err.response.error)
                commit('UPDATE_EXPENSE', false)
            })
    },
    async deleteExpense({ commit }, id) {
        await axiosInstance
            .delete('/expenses/' + id)
            .then(() => {
                commit('DELETE_EXPENSE', true)
            })
            .catch(err => {
                commit('DELETE_EXPENSE_ERROR', err.response.error)
                commit('DELETE_EXPENSE', false)
            })
    },
    async addSaving({ commit }, payload) {
        await axiosInstance
            .post('/savings/', payload)
            .then(() => {
                commit('ADD_SAVING', true)
            })
            .catch(err => {
                commit('ADD_SAVING_ERROR', err.response.error)
                commit('ADD_SAVING', false)
            })
    },
    async fetchSavings({ commit }) {
        commit('SAVINGS_LOADING', true)
        await axiosInstance
            .get('/SAVINGS/')
            .then(res => {
                commit('FETCH_SAVINGS', res.data)
                commit('SAVINGS_LOADING', false)
            })
            .catch(err => {
                commit('SAVINGS_ERROR', err.response.error)
                commit('SAVINGS_LOADING', false)
            })
    },
    async updateSaving({ commit }, payload) {
        await axiosInstance
            .put('/savings/'+payload.id, payload)
            .then(() => {
                commit('UPDATE_SAVING', true)
            })
            .catch(err => {
                commit('UPDATE_SAVING_ERROR', err.response.error)
                commit('UPDATE_SAVING', false)
            })
    },
    async deleteSaving({ commit }, id) {
        await axiosInstance
            .delete('/savings/' + id)
            .then(() => {
                commit('DELETE_SAVING', true)
            })
            .catch(err => {
                commit('DELETE_SAVING_ERROR', err.response.error)
                commit('DELETE_SAVING', false)
            })
    },
    async deleteLoan({ commit }, id) {
        await axiosInstance
            .delete('/loans/' + id)
            .then(() => {
                commit('DELETE_LOAN', true)
            })
            .catch(err => {
                commit('DELETE_LOAN_ERROR', err.response.error)
                commit('DELETE_LOAN', false)
            })
    },



}