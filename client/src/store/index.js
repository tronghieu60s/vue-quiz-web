import { createStore } from "vuex";
import * as string from "@common/string";

const JWT_TOKEN = process.env.VUE_APP_JWT_TOKEN;

export default createStore({
  state: {
    string,
    jwtToken: JWT_TOKEN,
    user: null,
    socket: null,
    isLoadingPage: false,
    isLoadingAction: false,
  },
  mutations: {
    setIsLoadingPage(state, payload) {
      state.isLoadingPage = payload;
    },
    setIsLoadingAction(state, payload) {
      state.isLoadingAction = payload;
    },
  },
  actions: {
    async actLoadingPage(context, callback) {
      context.commit("setIsLoadingPage", true);
      await callback();
      context.commit("setIsLoadingPage", false);
    },
    async actLoadingAction(context, callback) {
      context.commit("setIsLoadingAction", true);
      // wait 300 milliseconds
      await new Promise((res) => setTimeout(res, 300));
      await callback();
      context.commit("setIsLoadingAction", false);
    },
  },
  modules: {},
});
