import { Services } from "@/api";
import { computed, reactive, toRefs, watch } from "vue";

export const enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

interface State {
  theme: Theme;
}

const themeKey = "theme";

const osTheme = () =>
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? Theme.DARK
    : Theme.LIGHT;

export default function useTheme(services: Services) {
  const { storageService } = services;

  const state = reactive<State>({
    theme: storageService.getItem(themeKey, osTheme),
  });

  const isDarkTheme = computed(() => state.theme === Theme.DARK);
  const isLightTheme = computed(() => state.theme === Theme.LIGHT);

  function setTheme(theme: Theme) {
    state.theme = theme;
  }

  function setDarkTheme() {
    setTheme(Theme.DARK);
  }

  function setLightTheme() {
    setTheme(Theme.LIGHT);
  }

  watch(
    () => state.theme,
    (theme) => storageService.setItem(themeKey, theme)
  );

  return {
    ...toRefs(state),
    isDarkTheme,
    isLightTheme,
    setDarkTheme,
    setLightTheme,
  };
}

export type ThemeStore = ReturnType<typeof useTheme>;
