import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Games from "../views/Games.vue";
import Youtube from "../views/Youtube.vue";
import Settings from "../views/Settings.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/Games",
    name: "Games",
    component: Games
  },
  {
    path: "/Youtube",
    name: "Youtube",
    component: Youtube
  },
  {
    path: "/Settings",
    name: "Settings",
    component: Settings
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
