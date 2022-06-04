<template>
  <v-app>
    <v-main>
      <v-app-bar color="purple" elevation="4">
        <v-appbar-title> <b> Stat-Milestones </b></v-appbar-title>
        <v-divider vertical></v-divider>
        <v-row>
          <v-col></v-col>
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

      <v-container align="center" justify="center" v-if="!loadedChannels">
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>

        <v-container></v-container>
      </v-container>
      <v-container></v-container>
      <v-divider></v-divider>

      <v-snackbar
        :timeout="10000"
        absolute
        centered
        left
        color="deep-purple accent-4"
        elevation="24"
        v-model="snackbar.show"
      >
        Found {{ channels.length }} Twitch streamers using Stat-Milestones!
        <v-btn
          class="white--text"
          color="red"
          elevation="2"
          x-small
          @click="snackbar.show = false"
        >
          X
        </v-btn>
      </v-snackbar>

      <v-virtual-scroll height="700" item-height="700" :items="channels">
        <v-row>
          <div v-for="channel in channels">
            <v-col> <Profile :channel="channel" :show="show"></Profile></v-col>
          </div>
        </v-row>
      </v-virtual-scroll>

      <v-divider></v-divider>
      <Timeline></Timeline>
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
import Profile from "@/components/Profile.vue";
import axios from "axios";
export default {
  name: "App",

  components: { Profile },
  mounted() {
    this.getData();
  },
  data: () => ({
    snackbar: {
      show: false,
    },
    channels: [],
    show: false,
    loadedChannels: false,
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
  methods: {
    getData: function () {
      let response = axios
        .get(
          "https://6gywu6gbge.execute-api.us-east-1.amazonaws.com/Prod/live-channels?channel-id=?e93cf8730nd11z7gepkly2gry5kv8k"
        )
        .then((response) => {
          this.channels = response.data.channels;
          this.loadedChannels = true;
          this.snackbar.show = true;
        });
    },
    visibleChannels() {
      return this.channels.filter((p) => p.isActive).length;
    },
    installExtension() {
      window.open(
        "https://dashboard.twitch.tv/extensions/e93cf8730nd11z7gepkly2gry5kv8k",
        "_blank"
      );
    },
  },
};
</script>
<style>
</style>