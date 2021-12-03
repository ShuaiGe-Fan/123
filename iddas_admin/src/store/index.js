import { createStore } from "vuex";
import user from "./modules/user.js";
import application from "./modules/application.js";
import merchant from "./modules/merchant.js";
export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { user, application, merchant },
});
