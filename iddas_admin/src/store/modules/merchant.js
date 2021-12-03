const state = {
  user: {},
};

const mutations = {
  setUser(state, val) {
    state.user = val;
  },
};
const getters = {};
const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
