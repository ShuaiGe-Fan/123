const state = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
};
const getters = {
  user: (state) => state.userInfo.user,
  appId: (state) => state.userInfo.user.appId,
  userName: (state) => state.userInfo.user.userName,
  merchantId: (state) => state.userInfo.user.merchantId,
};
const mutations = {
  SET_USERINFO(state, val) {
    localStorage.setItem("userInfo", JSON.stringify(val));
    state.userInfo = val;
  },
};

const actions = {
  LOGIN(context, state) {
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
