// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify, ThemeDefinition } from "vuetify";
import colours from "vuetify/lib/util/colors";

const light: ThemeDefinition = {
  dark: false,
  colors: {
    error: colours.red.darken2,
    primary: colours.blue.base,
    success: colours.green.darken2,
    titleBar: colours.grey.lighten1,
  },
};

const dark: ThemeDefinition = {
  dark: true,
  colors: {
    error: colours.red.base,
    primary: colours.blue.lighten2,
    success: colours.green.base,
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
