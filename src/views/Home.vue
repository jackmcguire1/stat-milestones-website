<template>
  <v-carousel
    continous
    hide-delimiters
    height="500"
    @mouseover="
      $gtag.event('hover', {
        event_label: 'carousel',
        event_category: 'user_browsing_activity',
      })
    "
  >
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-img :src="item.src"></v-img>
    </v-carousel-item>
    <v-diver></v-diver>
  </v-carousel>
  <v-toolbar rounded color="deep-purple-accent-3"></v-toolbar>
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

  <v-toolbar rounded color="deep-purple-accent-3">
    <v-toolbar-title color="white">FEATURES</v-toolbar-title>
  </v-toolbar>
  <v-container></v-container>
  <v-carousel
    continous
    hide-delimiters
    height="auto"
    @mouseover="
      $gtag.event('hover', {
        event_label: 'carousel',
        event_category: 'user_browsing_activity',
      })
    "
  >
    <v-carousel-item
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-sheet align="center" height="100%" tile>
        <v-card outlined align="center" justify="center" width="450">
          <v-img :src="heart_logo" height="250" width="450"></v-img>

          <v-toolbar rounded color="deep-purple-accent-3">
            <v-toolbar-title color="white">Followers</v-toolbar-title>
          </v-toolbar>

          <v-card-title justify="center">
            <v-container justify="center"
              >Track your Twitch Followers
            </v-container></v-card-title
          >
        </v-card>
      </v-sheet>
    </v-carousel-item>

    <v-carousel-item
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-sheet align="center" height="100%" tile>
        <v-card outlined align="center" justify="center" width="450">
          <v-img :src="twitch_subscribers_logo"></v-img>

          <v-toolbar rounded color="deep-purple-accent-3">
            <v-toolbar-title color="white">Subscribers</v-toolbar-title>
          </v-toolbar>

          <v-card-title justify="center">
            <v-container justify="center"
              >Track your Twitch Subscribers
            </v-container></v-card-title
          >
        </v-card>
      </v-sheet>
    </v-carousel-item>

    <v-carousel-item
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-sheet align="center" height="100%" tile>
        <v-card outlined align="center" justify="center" width="450">
          <v-img :src="twitch_hype_train_logo" height="250" width="450"></v-img>

          <v-toolbar rounded color="deep-purple-accent-3">
            <v-toolbar-title color="white">Twitch Hype Train</v-toolbar-title>
          </v-toolbar>

          <v-card-title justify="center">
            <v-container justify="center"
              >Track your Twitch Hype Trains
            </v-container></v-card-title
          >
        </v-card>
      </v-sheet>
    </v-carousel-item>

    <v-carousel-item
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-sheet align="center" height="100%" tile>
        <v-card outlined align="center" justify="center" width="450">
          <v-img :src="twitch_goal_logo" height="250" width="450"></v-img>

          <v-toolbar rounded color="deep-purple-accent-3">
            <v-toolbar-title color="white">Twitch Goals</v-toolbar-title>
          </v-toolbar>

          <v-card-title justify="center">
            <v-container justify="center"
              >Track your Twitch Goal
            </v-container></v-card-title
          >
        </v-card>
      </v-sheet>
    </v-carousel-item>

    <v-carousel-item
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-sheet align="center" height="100%" tile>
        <v-card outlined align="center" justify="center" width="450">
          <v-img :src="twitch_bits_logo" height="250" width="450"></v-img>

          <v-toolbar rounded color="deep-purple-accent-3">
            <v-toolbar-title color="white">Twitch Bits</v-toolbar-title>
          </v-toolbar>
          <v-card-title justify="center">
            <v-container justify="center"
              >Viewers publish messages with Twitch Bits</v-container
            ></v-card-title
          >
        </v-card>
      </v-sheet>
    </v-carousel-item>

    <v-carousel-item
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-sheet align="center" height="100%" tile>
        <v-card outlined align="center" justify="center" width="450">
          <v-img :src="twitch_charity_logo" height="250" width="450"></v-img>

          <v-toolbar rounded color="deep-purple-accent-3">
            <v-toolbar-title color="white">Twitch Charity</v-toolbar-title>
          </v-toolbar>
          <v-card-title justify="center">
            <v-container justify="center"
              >Track donations to Twitch Charity</v-container
            ></v-card-title
          >
        </v-card>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>

  <Channels></Channels>

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

  <Analytics></Analytics>
  <v-toolbar rounded color="deep-purple-accent-3"></v-toolbar>
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
  <Playground></Playground>
  <v-toolbar rounded color="deep-purple-accent-3"></v-toolbar>
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
</template>

<script>
import twitch_goal_img from "@/assets/twitchgoal.png";
import followers2_img from "@/assets/followers2.png";
import achieved_followers_img from "@/assets/achievedfollowers.png";
import subscribers_img from "@/assets/subscribers.png";
import twitch_logo_img from "@/assets/twitch.png";

import twitch_hype_train_img from "@/assets/hypetrain.png";
import goals_hashtag_img from "@/assets/goals_hashtag.jpg";
import twitch_subscribers_logo_img from "@/assets/twitch_subscribers_logo.png";
import heart_img from "@/assets/heart.png";
import bits_img from "@/assets/bits.gif";
import charity_img from "@/assets/charity.jpeg";

import Channels from "@/views/Channels.vue";
import Analytics from "@/views/Analytics.vue";
import Playground from "@/views/Playground.vue";
import AnimatedNumber from "@/components/AnimatedNumber.vue";
export default {
  name: "Home",
  components: { Channels, Playground, Analytics, AnimatedNumber },
  mounted() {},
  data: () => ({
    twitch_bits_logo: bits_img,
    twitch_charity_logo: charity_img,
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
      this.$gtag.event("click", { event_label: "install_extension" });
      window.open(
        "https://dashboard.twitch.tv/extensions/e93cf8730nd11z7gepkly2gry5kv8k",
        "_blank"
      );
    },
  },
};
</script>
<style>
.v-carousel__controls {
  background: "#0B1340";
}
</style>
