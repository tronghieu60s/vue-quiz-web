import { createRouter, createWebHistory } from "vue-router";
import Home from "@views/Home.vue";
import Quizzes from "@views/Admin/Quizzes.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "Quiz",
    component: Quizzes,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
