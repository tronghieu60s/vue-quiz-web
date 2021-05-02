import Home from "@views/Home.vue";
import NotFound from "@views/NotFound.vue";
import Questions from "@views/Questions.vue";
import Quizzes from "@views/Quizzes.vue";
import QuizzesStart from "@views/QuizzesStart.vue";
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
    redirect: { name: "Quizzes" },
  },
  {
    path: "/admin/quizzes",
    name: "Quizzes",
    component: Quizzes,
  },
  {
    path: "/admin/quizzes/:quiz_id",
    name: "Questions",
    component: Questions,
    props: true,
  },
  {
    path: "/admin/quizzes/:quiz_id/start",
    name: "Quizzes-Start",
    component: QuizzesStart,
    props: true,
  },
  { path: "/:catchAll(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
