import { Services } from "@/api";
import { inject, InjectionKey } from "vue";
import useTheme, { ThemeStore } from "./useTheme";
import useWatchList, { WatchListStore } from "./useWatchList";
import useWatchLists, { WatchListsStore } from "./useWatchLists";
import useWatchListItems, { WatchListItemsStore } from "./useWatchListItems";
import useVuerouter, { VueRouterStore } from "./useVueRouter";
import useNotifications, { NotificationsStore } from "./useNotifications";

export interface Store {
  notificationsStore: NotificationsStore;
  routerStore: VueRouterStore;
  themeStore: ThemeStore;
  watchListStore: WatchListStore;
  watchListsStore: WatchListsStore;
  watchListItemsStore: WatchListItemsStore;
}

export function defineStore(services: Services): Store {
  const store = {} as Store;

  store.notificationsStore = useNotifications();
  store.themeStore = useTheme(services);
  store.watchListsStore = useWatchLists(services);

  store.watchListStore = useWatchList(store);
  store.watchListItemsStore = useWatchListItems(services);

  store.routerStore = useVuerouter(services, store);

  return store;
}

export const StoreKey = Symbol("Store") as InjectionKey<Store>;
export const injectStore = (): Store => inject(StoreKey) as Store;
