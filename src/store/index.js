import { createStore } from "vuex";
import { getQuizzes } from "@models/quizzes.firebase";
import * as string from "../common/string";

export default createStore({
  state: {
    string,
    quizzes: [],
    isLoadingPage: false,
    isLoadingAction: false,
  },
  mutations: {
    setQuizzes(state, payload) {
      state.quizzes = payload;
    },
    setIsLoadingPage(state, payload) {
      state.isLoadingPage = payload;
    },
    setIsLoadingAction(state, payload) {
      state.isLoadingAction = payload;
    },
  },
  actions: {
    async actLoadFirst(context) {
      context.commit("setIsLoadingPage", true);
      await context.dispatch("actLoadQuizzes");
      context.commit("setIsLoadingPage", false);
    },
    async actAsyncLoading(context, callback) {
      context.commit("setIsLoadingAction", true);
      await callback();
      context.commit("setIsLoadingAction", false);
    },
    async actLoadQuizzes(context) {
      const quizzes = await getQuizzes();
      context.commit("setQuizzes", quizzes);
    },
  },
  modules: {},
});
