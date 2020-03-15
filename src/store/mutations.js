export const mutations = {
    LOGIN_USER(state, payload) {
        state.user = payload
        state.isLoggedIn = true
    },
    LOGOUT(state) {
        state.isLoggedIn = false
    },
    IS_LOADING(state, payload) {
        state.isLoading = payload
    },
    LOGIN_ERROR(state, payload) {
        state.loginError = payload
        state.isLoggedIn = false
    },
    POST_AGENT(state, payload) {
        state.agent = payload,
            state.isAgentPosted = true
    },
    POST_AGENT_LOADING(state, payload) {
        state.postAgentLoading = payload
    },
    POST_AGENT_ERROR(state, payload) {
        state.postAgentError = payload
    },
    FETCH_AGENTS(state, payload) {
        state.agents = payload
    },
    AGENTS_LOADING(state, payload) {
        state.agentsLoading = payload
    },
    AGENTS_ERROR(state, payload) {
        state.agentsError = payload
    },
    DELETE_AGENT(state, payload) {
        state.deleteAgentStatus = payload
    },
    DELETE_AGENT_ERROR(state, payload) {
        state.deleteError = payload
    },
    UPDATE_AGENT(state, payload) {
        state.updateAgentStatus = payload
    },
    UPDATE_AGENT_ERROR(state, payload) {
        state.updateError = payload
    },
    ADD_RIDER(state, payload) {
        state.addRiderStatus = payload
    },
    ADD_RIDER_ERROR(state, payload) {
        state.addRiderError = payload
    },
    FETCH_RIDERS(state, payload) {
        state.riders = payload
    },
    RIDERS_LOADING(state, payload) {
        state.riders_loaing = payload
    },
    RIDERS_ERROR(state, payload) {
        state.riders_error = payload
    },
    DELETE_BODABODA(state, payload) {
        state.deleteBodabodaStatus = payload
    },
    DELETE_BODABODA_ERROR(state, payload) {
        state.deleteBodabodaError = payload
    },
    UPDATE_BODABODA_ERROR(state, payload) {
        state.updateBodabodaError = payload
    },
    UPDATE_BODABODA(state, payload) {
        state.updateBodabodaStatus = payload
    },
    ADD_LOAN(state, payload) {
        state.addLoanStatus = payload
    },
    ADD_LOAN_ERROR(state, payload) {
        state.addLoanError = payload
    },
    FETCH_LOANS(state, payload) {
        state.loans = payload
    },
    LOANS_LOADING(state, payload) {
        state.loansLoading = payload
    },
    LOANS_ERROR(state, payload) {
        state.fetchLoansError = payload
    },
    UPDATE_LOAN(state, payload) {
        state.updateLoanStatus = payload
    },
    UPDATE_LOAN_ERROR(state, payload) {
        state.updateLoanError = payload
    },
    LOAN_PAYMENT(state, payload) {
        state.loanPaymentStatus = payload
    },
    LOAN_PAYMENT_ERROR(state, payload) {
        state.loanPaymentError = payload
    },
    COUNT_RIDERS(state, payload) {
        state.count_riders = payload
    },
    COUNT_RIDERS_LOADING(state, payload) {
        state.count_ridersLoading = payload
    },
    COUNT_RIDERS_ERROR(state, payload) {
        state.count_ridersError = payload
    },
    COUNT_AGENTS(state, payload) {
        state.count_agents = payload
    },
    COUNT_AGENTS_LOADING(state, payload) {
        state.count_agentsLoading = payload
    },
    COUNT_AGENTS_ERROR(state, payload) {
        state.count_agentsError = payload
    },
    COUNT_LOANS(state, payload) {
        state.count_loans = payload
    },
    COUNT_LOANS_LOADING(state, payload) {
        state.count_loansLoading = payload
    },
    COUNT_LOANS_ERROR(state, payload) {
        state.count_loansError = payload
    },
    PAID(state, payload) {
        state.paid = payload
    },
    PAID_LOADING(state, payload) {
        state.paid_loading = payload
    },
    PAID_ERROR(state, payload) {
        state.paid_Error = payload
    },
    UNPAID(state, payload) {
        state.unpaid = payload
    },
    UNPAID_LOADING(state, payload) {
        state.unpaid_loading = payload
    },
    UNPAID_ERROR(state, payload) {
        state.unpaid_Error = payload
    },
    ADD_EXPENSE(state, payload) {
        state.addExpenseStatus = payload
    },
    ADD_EXPENSE_ERROR(state, payload) {
        state.addExpenseError = payload
    },
    FETCH_EXPENSES(state, payload) {
        state.expenses = payload
    },
    EXPENSES_LOADING(state, payload) {
        state.expensesLoading = payload
    },
    EXPENSES_ERROR(state, payload) {
        state.fetchExpensesError = payload
    },
    UPDATE_EXPENSE(state, payload) {
        state.updateExpenseStatus = payload
    },
    UPDATE_EXPENSE_ERROR(state, payload) {
        state.updateExpenseError = payload
    },
    DELETE_EXPENSE(state, payload) {
        state.deleteExpenseStatus = payload
    },
    DELETE_EXPENSE_ERROR(state, payload) {
        state.deleteExpenseError = payload
    },
    ADD_SAVING(state, payload) {
        state.addSavingStatus = payload
    },
    ADD_SAVING_ERROR(state, payload) {
        state.addSavingError = payload
    },
    FETCH_SAVINGS(state, payload) {
        state.savings = payload
    },
    SAVINGS_LOADING(state, payload) {
        state.savingsLoading = payload
    },
    SAVINGS_ERROR(state, payload) {
        state.fetchSavingsError = payload
    },
    UPDATE_SAVING(state, payload) {
        state.updateSavingStatus = payload
    },
    UPDATE_SAVING_ERROR(state, payload) {
        state.updateSavingError = payload
    },
    DELETE_SAVING(state, payload) {
        state.deleteSavingStatus = payload
    },
    DELETE_SAVING_ERROR(state, payload) {
        state.deleteSavingError = payload
    },
    DELETE_LOAN(state, payload) {
        state.deleteLoanStatus = payload
    },
    DELETE_LOAN_ERROR(state, payload) {
        state.deleteLoanError = payload
    },


}