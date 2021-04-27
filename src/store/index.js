import { createStore } from "vuex";
import { getQuizzes } from "@models/quizzes.firebase";

export default createStore({
  state: {
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

      const quizzes = await getQuizzes();
      context.commit("setQuizzes", quizzes);

      context.commit("setIsLoadingPage", false);
    },
    async actAsyncLoading(context, callback) {
      context.commit("setIsLoadingAction", true);
      await callback();
      context.commit("setIsLoadingAction", false);
    },
  },
  modules: {},
});
