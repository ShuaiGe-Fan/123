import api from "@/common/api/api.js";
import axios from "@/common/http.js";
const state = {
  userInfo: {},
};

const mutations = {
  SET_USERINFO(state, val) {
    state.user = val;
  },
};
const getters = {};

const actions = {
  LOGIN(context, state) {
    axios.post(api.login, state).then((res) => {
      console.log(res);
    });
    context.commit("SET_USERINFO", state);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
