import router from "@/plugins/vue-router";
import { Router } from "vue-router";
import StorageServiceInstance, { StorageService } from "./StorageService";
import WatchListItemsServiceInstance, {
  WatchListItemsService,
} from "./WatchListItemsService";

export interface Services {
  storageService: StorageService;
  watchListItemsService: WatchListItemsService;
  router: Router;
}

const services: Services = {
  storageService: StorageServiceInstance,
  watchListItemsService: WatchListItemsServiceInstance,
  router: router,
};

export default services;
