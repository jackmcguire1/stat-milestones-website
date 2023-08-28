import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import.meta.hot;
import VueGtag from "vue-gtag";
import router from "./router";


import { createVuetify } from 'vuetify'

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#0B1340',
    surface: '#0B1340',
    primary: '#0B1340',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

let vuetifyApp = createVuetify({
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    },
  },
})

loadFonts();

createApp(App)
  .use(router)
  .use(vuetifyApp)
  .use(
    VueGtag,
    {
      appName: 'stat-milestones-website',
      pageTrackerScreenviewEnabled: true,
      config: { id: "UA-139758742-2" },
    },
    router
  )
  .mount("#app");
