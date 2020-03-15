export const getters = {
  getAgentById: (state) => (id) => {
    return state.agents.find(item => item.id === id)
  },
  getRiderById: (state) => (id) => {
    return state.riders.find(item => item.id === id)
  },
  getRiderNames(state) {
    return state.riders.map((rider) => {
      return rider.name;
    })
  },
  getRiderByName: (state) => (name) => {
    return state.riders.find(item => item.name === name)
  },
  getLoanById: (state) => (id) => {
    return state.loans.find(item => item.id === id)
  },
  getExpenseById: (state) => (id) => {
    return state.expenses.find(item => item.id === id)
  },
  getSavingById: (state) => (id) => {
    return state.savings.find(item => item.id === id)
  },


}