import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import.meta.hot
import VueGtag from "vue-gtag";

loadFonts()

createApp(App)
  .use(vuetify)
  .use(VueGtag, {
    config: { id: "G-WZZT87HP70" }
  })
  .mount('#app')
