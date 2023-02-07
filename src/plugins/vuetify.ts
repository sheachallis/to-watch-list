// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify, ThemeDefinition } from "vuetify";
import colours from "vuetify/lib/util/colors";

const light: ThemeDefinition = {
  dark: false,
  colors: {
    titleBar: colours.grey.lighten3,
  },
};

const dark: ThemeDefinition = {
  dark: true,
  colors: {
    titleBar: colours.grey.darken3,
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: { light, dark },
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
