import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import.meta.hot;
import VueGtag from "vue-gtag";
import router from "./router";

loadFonts();

createApp(App)
  .use(router)
  .use(vuetify)
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
