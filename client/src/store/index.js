import jwt from "jsonwebtoken";
import { createStore } from "vuex";
import * as string from "../common/string";

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
    setQuizUserStorage(state, payload) {
      const { quiz_code, username } = payload;
      let storage = {};
      try {
        storage = jwt.verify(
          localStorage.getItem(".quiz_config_user"),
          state.jwtToken
        );
      } catch (err) {
        localStorage.removeItem(".quiz_config_user");
      }
      storage[quiz_code] = username;
      const tokenStorage = jwt.sign(storage, state.jwtToken);
      localStorage.setItem(".quiz_config_user", tokenStorage);
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
      await callback();
      context.commit("setIsLoadingAction", false);
    },
  },
  modules: {},
});
