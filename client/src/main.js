import Toaster from "@meforma/vue-toaster";
import apolloClient from "@utils/graphql";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { createApp, h, provide } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
})
  .use(store)
  .use(router)
  .use(Toaster)
  .mount("#app");
