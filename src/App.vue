<template>
  <v-app>
    <v-main>
      <v-app-bar color="purple" elevation="4">
        <v-appbar-title> <b> Stat-Milestones </b></v-appbar-title>
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
        <v-container fluid>
          <v-row align="center" justify="center">
            <v-col></v-col>
            <v-divider></v-divider>
            {{ new Date().getFullYear() }} — <strong>Stat-Milestones</strong>
          </v-row>
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
        });
    },
    visibleChannels() {
      return this.channels.filter((p) => p.isActive).length;
    },
  },
};
</script>
<style>
</style>