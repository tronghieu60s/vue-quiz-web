import Questions from "@views/Admin/Questions.vue";
import Quizzes from "@views/Admin/Quizzes.vue";
import Home from "@views/Home.vue";
import NotFound from "@views/NotFound.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Quizzes,
  },
  {
    path: "/admin/quiz/:quiz_id",
    name: "Questions",
    component: Questions,
    props: true,
  },
  { path: "/:catchAll(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
