import { RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import WatchListView from "../views/WatchListView.vue";
import NotFound from "../views/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/list/:id",
    name: "WatchList",
    component: WatchListView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Not Found",
    component: NotFound,
  },
];

export default routes;
