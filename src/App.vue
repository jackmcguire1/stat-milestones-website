<template>
  <v-app>
    <v-main>
      <v-app-bar color="purple" elevation="4">
        <v-appbar-title>
          <router-link style="color: white" to="/"> <b> Stat-Milestones </b> </router-link>
        </v-appbar-title>
        <v-divider vertical></v-divider>
        <v-row>
          <v-col></v-col>

          <v-btn color="white" flat>
            <router-link style="color: white" to="/channels"> Live Twitch Streamers </router-link>
          </v-btn>

          <v-btn color="white" :style="'{font:white}'" @click="installExtension">
            Install Extension
            <v-icon right dark> mdi-cloud-upload </v-icon>
          </v-btn>
        </v-row>
      </v-app-bar>

      <v-dialog persistence v-model="cookies" width="500">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Google Analytics Cookies
          </v-card-title>

          <v-card-text>
            This site uses cookies from Google to deliver its services and to
            analyze traffic. Information about your use of this site is shared
            with Google. By using this site, you agree to its use of cookies.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn text color="blue" @click="openGoogleCookies">
              Learn More
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="cookies = false;  $gtag.event('click', {event_label: 'google_cookies_close', event_category: 'google_cookies'});">
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-content>
        <router-view></router-view>
      </v-content>

      <v-footer dark justify="center">
        <v-container justify="center">
          <v-btn color="white" :style="'{font:white}'" @click="installExtension">
            Install Extension
            <v-icon right dark> mdi-cloud-upload </v-icon>
          </v-btn>
        </v-container>
        <v-divider></v-divider>
        <v-container justify="center">
          {{ new Date().getFullYear() }} — <strong>Stat-Milestones</strong>
        </v-container>
        <v-container justify="center">
          Contact: <strong>jackmcguire35+support@gmail.com</strong>
        </v-container>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
import { onMounted } from 'vue';

export default {
  name: "App",
  components: {},
  methods: {
    installExtension() {
      this.$gtag.event("click", { event_label: "install_extension" });
      window.open('https://dashboard.twitch.tv/extensions/e93cf8730nd11z7gepkly2gry5kv8k', '_blank');
    },
    openGoogleCookies() {
      this.$gtag.event("click", {
        event_label: "google_cookies",
        event_category: "google_cookies",
      });

     
      window.open("https://policies.google.com/technologies/cookies", "_blank");
    },
  },
  data() {
    return {
      cookies: false
    };
  },
  mounted() {
    setTimeout(function(){this.cookies=true;}.bind(this),10000)
  }
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
