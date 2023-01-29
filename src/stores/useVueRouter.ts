import { Services } from "@/api";
import { NavigationGuard } from "vue-router";
import { Store } from ".";

export default function useVuerouter(services: Services, store: Store) {
  const { router } = services;
  const { watchListStore } = store;
  const { loadList } = watchListStore;

  const prepareWatchList: NavigationGuard = (to, _from, next) => {
    const { id } = to.params;
    try {
      loadList(Number(id));
      next();
    } catch (error) {
      console.log();

      next(false);
      throw error;
    }
  };

  const entryGuards: Record<string, NavigationGuard> = {
    WatchList: prepareWatchList,
  };

  router.beforeEach((to, from, next) => {
    const guard = entryGuards[to.name as string];
    if (guard) {
      guard(to, from, next);
    } else {
      next();
    }
  });

  return { ...router };
}

export type VueRouterStore = ReturnType<typeof useVuerouter>;
