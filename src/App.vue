<template>
  <v-app>
    <v-main>
      <v-app-bar color="purple" elevation="4">
        <v-appbar-title>  <router-link style="color: white" to="/"> <b> Stat-Milestones </b> </router-link></v-appbar-title>
        <v-divider vertical></v-divider>
        <v-row>
          <v-col></v-col>

           <v-btn color="white" flat>
            <router-link style="color: white" to="/channels"> Live Twitch Streamers </router-link>
          </v-btn>

          <v-btn
            color="white"
            :style="'{font:white}'"
            @click="installExtension"
          >
            Install Extension
            <v-icon right dark> mdi-cloud-upload </v-icon>
          </v-btn>
        </v-row>
      </v-app-bar>

      <v-content> <router-view></router-view></v-content>

      <v-footer dark justify="center">
        <v-container justiy="center">
          <v-btn
            color="white"
            :style="'{font:white}'"
            @click="installExtension"
          >
            Install Extension
            <v-icon right dark> mdi-cloud-upload </v-icon>
          </v-btn>
        </v-container>
        <v-divider></v-divider>
        <v-container justiy="center">
          {{ new Date().getFullYear() }} — <strong>Stat-Milestones</strong>
        </v-container>
        <v-container justiy="center">
          Contact: <strong>jackmcguire35+support@gmail.com</strong>
        </v-container>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    installExtension() {
        this.$gtag.event("click", { event_label: "install_extension" });
        window.open('https://dashboard.twitch.tv/extensions/e93cf8730nd11z7gepkly2gry5kv8k', '_blank');
    }
  },
  data() {
    return {
      //
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
