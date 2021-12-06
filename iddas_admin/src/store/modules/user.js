import api from "@/common/api/api.js";
import axios from "@/common/axios.js";
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
    console.log("LOGIN", 123456);
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
