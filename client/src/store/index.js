import { createStore } from "vuex";
import * as string from "../common/string";
import { socketConnect } from "./socket";

export default createStore({
  state: {
    string,
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
    setQuizUserStorage(_, payload) {
      const { quiz_code, username } = payload;
      const quizStorage =
        JSON.parse(localStorage.getItem(".quiz_config_user")) || {};
      quizStorage[quiz_code] = username;
      localStorage.setItem(".quiz_config_user", JSON.stringify(quizStorage));
    },
  },
  actions: {
    async actLoadingPage(context) {
      context.commit("setIsLoadingPage", true);

      const socket = await socketConnect();
      context.state.socket = socket;

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
