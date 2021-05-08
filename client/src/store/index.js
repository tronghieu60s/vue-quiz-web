import jwt from "jsonwebtoken";
import { createStore } from "vuex";
import * as string from "../common/string";
import router from "../router/index";
import { socketConnect } from "./socket";

const JWT_TOKEN = process.env.VUE_APP_JWT_TOKEN;

export default createStore({
  state: {
    string,
    jwtToken: JWT_TOKEN,
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

      const currentPath = router.currentRoute.value.path;
      if (
        currentPath.indexOf("/admin") !== -1 ||
        currentPath.indexOf("/auth") !== -1
      ) {
        const token = localStorage.getItem(".config_user");
        jwt.verify(token, context.state.jwtToken, (err, decoded) => {
          if (err) return router.push({ name: "Login" });
          if (decoded) {
            if (currentPath.indexOf("/auth") !== -1)
              return router.push({ name: "Admin" });
          }
        });
      }

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
