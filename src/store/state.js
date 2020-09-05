export const state = {
  isLoggedIn: false,
  token: localStorage.getItem("token") || "",
  isLoading: false,
  user: {},
  loginError: "",
  isSignedUp: false,
  signupLoading: false,
  signUpError: {},
  users: [],
  usersLoading: false,
  fetchUsersError: "",
  updateUserStatus: false,
  updateUserLoading: false,
  updateUserError: "",
  postMemberStatus: false,
  postMemberLoading: false,
  postMemberError: "",
  members: [],
  membersLoading: false,
  fetchMembersError: "",
  updateMemberStatus: false,
  updateMemberLoading: false,
  updateMemberError: "",
  postSavingStatus: false,
  postSavingLoading: false,
  postSavingError: "",
  savings: [],
  savingsLoading: false,
  fetchSavingsError: "",
  updateSavingStatus: false,
  updateSavingLoading: false,
  updateSavingError: "",
  postLoanStatus: false,
  postLoanLoading: false,
  postLoanError: "",
  loans: [],
  loansLoading: false,
  fetchLoansError: "",
  updateLoanStatus: false,
  updateLoanLoading: false,
  updateLoanError: "",
  postExpenseStatus: false,
  postExpenseLoading: false,
  postExpenseError: "",
  expenses: [],
  expensesLoading: false,
  fetchExpensesError: "",
  updateExpenseStatus: false,
  updateExpenseLoading: false,
  updateExpenseError: "",
  employees_count: "",
  employees_countLoading: false,
  fetchEmployees_countError: "",
  savings_count: "",
  savings_countLoading: false,
  fetchSavings_countError: "",
  members_count: "",
  members_countLoading: false,
  fetchMembers_countError: "",
  loans_count: "",
  loans_countLoading: false,
  fetchLoans_countError: "",
  savings_trend: [],
  savings_trendLoading: false,
  fetchSavings_trendError: "",
  debitSavingStatus: false,
  debitSavingLoading: false,
  debitSavingError: "",
  payLoanStatus: false,
  payLoanLoading: false,
  payLoanError: "",
  postTransactionStatus: false,
  postTransactionLoading: false,
  postTransactionError: "",
  transactions: [],
  transactionsLoading: false,
  fetchTransactionsError: ""
};
