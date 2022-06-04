<template>
  <v-app>
    <v-main>
      <v-app-bar color="purple" elevation="4">
        <v-appbar-title> <b> Stat-Milestones </b></v-appbar-title>

        <v-row align="right" justify="right">
          <v-col></v-col>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
            align="center"
            justify="center"
            ><v-divider vertical></v-divider>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-row>
      </v-app-bar>
      <v-divider></v-divider>
      <v-divider></v-divider>
      <v-virtual-scroll :items="channels" height="3000" item-height="1000">
        <v-row>
          <div v-for="channel in channels">
            <v-col sm="1">
              <Profile :channel="channel" :show="show"></Profile
            ></v-col>
          </div>
        </v-row>
      </v-virtual-scroll>

      <v-divider></v-divider>
      <Timeline></Timeline>
      <v-footer dark justify="center">
        <v-container fill-height fluid>
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
import Timeline from "@/components/Timeline.vue";
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
    skeletonShow: true,
    skeleton: false,
    show: false,
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
  methods: {
    getData: function () {
      let response = axios
        .get(
          "https://6gywu6gbge.execute-api.us-east-1.amazonaws.com/Prod/live-channels?channel-id=?e93cf8730nd11z7gepkly2gry5kv8k"
        )
        .then((response) => {
          console.log(response.data.channels);
          this.channels = response.data.channels;
        });
    },
  },
};
</script>
<style>
</style>