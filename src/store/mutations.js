export const mutations = {
  LOGIN_USER(state, payload) {
    state.user = payload.user;
    state.token = payload.token;
    state.isLoggedIn = true;
  },
  IS_LOADING(state, payload) {
    state.isLoading = payload;
  },
  LOGIN_ERROR(state, payload) {
    state.loginError = payload;
    state.isLoggedIn = false;
  },
  SIGNUP_STATUS(state, payload) {
    state.isSignedUp = payload;
  },
  SIGNUP_LOADING(state, payload) {
    state.signupLoading = payload;
  },
  SIGNUP_ERROR(state, payload) {
    state.signUpError = payload;
  },
  FETCH_USERS(state, payload) {
    state.users = payload;
  },
  FETCH_USERS_LOADING(state, payload) {
    state.usersLoading = payload;
  },
  FETCH_USERS_ERROR(state, payload) {
    state.fetchUsersError = payload;
  },
  UPDATE_USER_STATUS(state, payload) {
    state.updateUserStatus = payload;
  },
  UPDATE_USER_LOADING(state, payload) {
    state.updateUserLoading = payload;
  },
  UPDATE_USER_ERROR(state, payload) {
    state.updateUserError = payload;
  },
  POST_MEMBER_STATUS(state, payload) {
    state.postMemberStatus = payload;
  },
  POST_MEMBER_LOADING(state, payload) {
    state.postMemberLoading = payload;
  },
  POST_MEMBER_ERROR(state, payload) {
    state.postMemberError = payload;
  },
  FETCH_MEMBERS(state, payload) {
    state.members = payload;
  },
  FETCH_MEMBERS_LOADING(state, payload) {
    state.membersLoading = payload;
  },
  FETCH_MEMBERS_ERROR(state, payload) {
    state.fetchMembersError = payload;
  },
  UPDATE_MEMBER_STATUS(state, payload) {
    state.updateMemberStatus = payload;
  },
  UPDATE_MEMBER_LOADING(state, payload) {
    state.updateMemberLoading = payload;
  },
  UPDATE_MEMBER_ERROR(state, payload) {
    state.updateMemberError = payload;
  },
  POST_SAVING_STATUS(state, payload) {
    state.postSavingStatus = payload;
  },
  POST_SAVING_LOADING(state, payload) {
    state.postSavingLoading = payload;
  },
  POST_SAVING_ERROR(state, payload) {
    state.postSavingError = payload;
  },
  FETCH_SAVINGS(state, payload) {
    state.savings = payload;
  },
  FETCH_SAVINGS_LOADING(state, payload) {
    state.savingsLoading = payload;
  },
  FETCH_SAVINGS_ERROR(state, payload) {
    state.fetchSavingsError = payload;
  },
  UPDATE_SAVING_STATUS(state, payload) {
    state.updateSavingStatus = payload;
  },
  UPDATE_SAVING_LOADING(state, payload) {
    state.updateSavingLoading = payload;
  },
  UPDATE_SAVING_ERROR(state, payload) {
    state.updateSavingError = payload;
  },
  POST_LOAN_STATUS(state, payload) {
    state.postLoanStatus = payload;
  },
  POST_LOAN_LOADING(state, payload) {
    state.postLoanLoading = payload;
  },
  POST_LOAN_ERROR(state, payload) {
    state.postLoanError = payload;
  },
  FETCH_LOANS(state, payload) {
    state.loans = payload;
  },
  FETCH_LOANS_LOADING(state, payload) {
    state.loansLoading = payload;
  },
  FETCH_LOANS_ERROR(state, payload) {
    state.fetchLoansError = payload;
  },
  UPDATE_LOAN_STATUS(state, payload) {
    state.updateLoanStatus = payload;
  },
  UPDATE_LOAN_LOADING(state, payload) {
    state.updateLoanLoading = payload;
  },
  UPDATE_LOAN_ERROR(state, payload) {
    state.updateLoanError = payload;
  },
  POST_EXPENSE_STATUS(state, payload) {
    state.postExpenseStatus = payload;
  },
  POST_EXPENSE_LOADING(state, payload) {
    state.postExpenseLoading = payload;
  },
  POST_EXPENSE_ERROR(state, payload) {
    state.postExpenseError = payload;
  },
  FETCH_EXPENSES(state, payload) {
    state.expenses = payload;
  },
  FETCH_EXPENSES_LOADING(state, payload) {
    state.expensesLoading = payload;
  },
  FETCH_EXPENSES_ERROR(state, payload) {
    state.fetchExpensesError = payload;
  },
  UPDATE_EXPENSE_STATUS(state, payload) {
    state.updateExpenseStatus = payload;
  },
  UPDATE_EXPENSE_LOADING(state, payload) {
    state.updateExpenseLoading = payload;
  },
  UPDATE_EXPENSE_ERROR(state, payload) {
    state.updateExpenseError = payload;
  },
};
