import router from "@/plugins/vue-router";
import { Router } from "vue-router";
import WatchListItemsServiceInstance, {
  WatchListItemsService,
} from "./WatchListItemsService";

export interface Services {
  watchListItemsService: WatchListItemsService;
  router: Router;
}

const services: Services = {
  watchListItemsService: WatchListItemsServiceInstance,
  router: router,
};

export default services;
