<template>
  <v-carousel hide-delimiters cycle height="500">
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-img :src="item.src"></v-img>
    </v-carousel-item>
  </v-carousel>
  <v-toolbar rounded color="purple"></v-toolbar>
  <v-container justify="center">
    <v-btn
      block
      large
      color="white"
      :style="'{font:white}'"
      @click="installExtension"
    >
      Install Extension
      <v-icon right dark> mdi-cloud-upload </v-icon>
    </v-btn></v-container
  >

  <v-divider></v-divider>
  <v-toolbar rounded color="purple">
    <v-toolbar-title color="white">FEATURES</v-toolbar-title>
  </v-toolbar>

  <v-row justify="center">
    <v-col></v-col>
    <v-col>
      <v-card outlined align="center" justify="center" height="500" width="450">
        <v-img :src="heart_logo" height="250" width="450"></v-img>

        <v-toolbar rounded color="purple">
          <v-toolbar-title color="white">Followers</v-toolbar-title>
        </v-toolbar>

        <v-card-subtitle>
          Track the progress of your desired amount of Twitch Followers
        </v-card-subtitle>
      </v-card>
    </v-col>
    <v-col>
      <v-col>
        <v-card
          outlined
          align="center"
          justify="center"
          height="500"
          width="450"
        >
          <v-img :src="twitch_subscribers_logo"></v-img>

          <v-toolbar rounded color="purple">
            <v-toolbar-title color="white">Subscribers</v-toolbar-title>
          </v-toolbar>

          <v-card-subtitle>
            Track the progress of your desired amount of Twitch Subscribers
          </v-card-subtitle>
        </v-card>
      </v-col>
      ></v-col
    >
    <v-col></v-col>
  </v-row>
  <v-row></v-row>

  <v-row justify="center">
    <v-col></v-col>
    <v-col>
      <v-card outlined align="center" justify="center" height="500" width="450">
        <v-img :src="twitch_hype_train_logo" height="250" width="450"></v-img>

        <v-toolbar rounded color="purple">
          <v-toolbar-title color="white">Hype Events</v-toolbar-title>
        </v-toolbar>

        <v-card-title><v-divider></v-divider></v-card-title>
        <v-card-subtitle>
          Track the progress of Twitch Hype events
        </v-card-subtitle>
      </v-card>
    </v-col>
    <v-col>
      <v-col>
        <v-card
          outlined
          align="center"
          justify="center"
          height="500"
          width="450"
        >
          <v-img :src="twitch_goal_logo"></v-img>

          <v-toolbar rounded color="purple">
            <v-toolbar-title color="white">Goals</v-toolbar-title>
          </v-toolbar>
          <v-card-title justify="center" align="center">
            <v-divider></v-divider>
          </v-card-title>

          <v-card-subtitle>
            Track the progress of your Twitch Goals
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-col>
    <v-col></v-col>
  </v-row>

  <v-toolbar rounded color="purple"></v-toolbar>
  <v-container justify="center">
    <v-btn
      block
      large
      color="white"
      :style="'{font:white}'"
      @click="installExtension"
    >
      Install Extension
      <v-icon right dark> mdi-cloud-upload </v-icon>
    </v-btn></v-container
  >

  <v-divider></v-divider>
  <v-toolbar rounded color="purple">
    <v-toolbar-title color="white">LIVE TWITCH CHANNELS</v-toolbar-title>
  </v-toolbar>

  <Channels></Channels>
</template>

<script>
import axios from "axios";
import twitch_goal_img from "@/assets/twitchgoal.png";
import followers2_img from "@/assets/followers2.png";
import followed_img from "@/assets/followed.png";
import achieved_followers_img from "@/assets/achievedfollowers.png";
import subscribers_img from "@/assets/subscribers.png";
import twitch_logo_img from "@/assets/twitch.png";

import twitch_hype_train_img from "@/assets/hypetrain.png";
import goals_hashtag_img from "@/assets/goals_hashtag.jpg";
import twitch_subscribers_logo_img from "@/assets/twitch_subscribers_logo.png";
import heart_img from "@/assets/heart.png";

import Channels from "@/views/Channels.vue";
export default {
  name: "Home",
  components: { Channels },
  mounted() {},
  data: () => ({
    twitch_hype_train_logo: twitch_hype_train_img,
    twitch_goal_logo: goals_hashtag_img,
    heart_logo: heart_img,
    twitch_subscribers_logo: twitch_subscribers_logo_img,
    twitch_logo: twitch_logo_img,
    items: [
      {
        src: followers2_img,
      },
      {
        src: followed_img,
      },
      {
        src: achieved_followers_img,
      },
      {
        src: subscribers_img,
      },
      {
        src: twitch_goal_img,
      },
    ],
  }),
  methods: {
    installExtension() {
      window.open(
        "https://dashboard.twitch.tv/extensions/e93cf8730nd11z7gepkly2gry5kv8k",
        "_blank"
      );
    },
  },
};
</script>
<style></style>
