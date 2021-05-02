import { createStore } from "vuex";
import * as string from "../common/string";

export default createStore({
  state: {
    string,
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
    async actLoadingPage(context) {
      context.commit("setIsLoadingPage", true);
      context.commit("setIsLoadingPage", false);
    },
    async actLoadingAction(context, callback) {
      context.commit("setIsLoadingAction", true);
      await callback();
      context.commit("setIsLoadingAction", false);
    },
  },
  modules: {},
});
