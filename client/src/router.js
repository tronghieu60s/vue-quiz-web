import Home from "@containers/Home.vue";
import JoinRoom from "@containers/JoinRoom.vue";
import Login from "@containers/Login.vue";
import Register from "@containers/Register.vue";
import Questions from "@containers/Questions.vue";
import Quizzes from "@containers/Quizzes.vue";
import QuizzesStart from "@containers/QuizzesStart.vue";
import NotFound from "@containers/NotFound.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/quiz/:quiz_code/:player_username",
    name: "JoinRoom",
    component: JoinRoom,
    props: true,
  },
  {
    path: "/admin",
    name: "Admin",
    redirect: { name: "Quizzes" },
  },
  {
    path: "/auth",
    name: "Authentication",
    redirect: { name: "Login" },
  },
  {
    path: "/auth/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/auth/register",
    name: "Register",
    component: Register,
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
    path: "/admin/quizzes/:quiz_code/start",
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
