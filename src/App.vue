<template>
  <v-app>
    <v-content>
      <v-app-bar prominent color="deep-purple-accent-3" elevation="4">
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-app-bar-title align="left"> Stat-Milestones</v-app-bar-title>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" location="left" permanent>
        <v-list-item
          prepend-avatar="data:image/png;base64,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"
          title="Home"
          @click="openHome"
        >
        </v-list-item>

        <v-list-item
          prepend-avatar="data:image/jpeg;base64,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"
          title="Live Twitch Streamers"
          @click="openChannels"
        >
        </v-list-item>

        <v-list-item
          prepend-avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRim2IECU3ZNyTzP4m0rHWOCrK8gOLWimXxyQ&usqp=CAU"
          title="Discord"
          @click="openDiscord"
        >
        </v-list-item>

        <v-list-item
          prepend-avatar="data:image/png;base64,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"
          title="About"
          @click="installExtension"
        >
        </v-list-item>
      </v-navigation-drawer>

      <v-main>
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
              <v-btn
                color="primary"
                text
                @click="
                  cookies = false;
                  $gtag.event('click', {
                    event_label: 'google_cookies_close',
                    event_category: 'google_cookies',
                  });
                "
              >
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
          <v-container justify="center">
            {{ new Date().getFullYear() }} — <strong>Stat-Milestones</strong>
          </v-container>
          <v-container justify="center">
            Contact: <strong>jackmcguire35+support@gmail.com</strong>
          </v-container>
        </v-footer>
      </v-main>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  components: {},
  methods: {
    installExtension() {
      this.$gtag.event("click", { event_label: "install_extension" });
      window.open(
        "https://dashboard.twitch.tv/extensions/e93cf8730nd11z7gepkly2gry5kv8k",
        "_blank"
      );
    },
    openGoogleCookies() {
      this.$gtag.event("click", {
        event_label: "google_cookies",
        event_category: "google_cookies",
      });

      window.open("https://policies.google.com/technologies/cookies", "_blank");
    },
    openDiscord() {
      this.$gtag.event("click", { event_label: "discord_channel" });
      window.open(this.discordLink, "_blank");
    },
    openChannels() {
      this.$gtag.event("click", { event_label: "channels" });
      window.open("/channels", "_self");
    },
    openHome() {
      this.$gtag.event("click", { event_label: "home" });
      window.open("/", "_self");
    },
    getDiscordLink() {
      axios
        .get("https://discord.com/api/guilds/997982082263433288/widget.json")
        .then((resp) => {
          this.discordLink = resp.data.instant_invite;
        })
        .catch((error) => {});
    },
  },
  data() {
    return {
      cookies: false,
      drawer: false,
      rail: true,
      discordLink: "",
    };
  },
  mounted() {
    this.getDiscordLink();
    setTimeout(
      function () {
        //this.cookies = true;
      }.bind(this),
      10000
    );
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

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.body {
  background: "#0B1340";
  color: white;
}
</style>
