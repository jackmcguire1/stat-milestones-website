<template>
  <v-container></v-container>
  <v-container></v-container>
  <v-divider></v-divider>
  <v-snackbar
    :timeout="10000"
    absolute
    centered
    multiLine
    left
    color="deep-purple accent-4"
    elevation="24"
    v-model="snackbar.show"
    @mouseover="
      this.$gtag.event('hover', {
        event_label: 'snackbar_interaction',
        event_category: 'alert_interaction',
      })
    "
  >
    Found {{ channels.length }} Twitch streamers using Stat-Milestones!
    <v-btn
      class="white--text"
      color="red"
      elevation="2"
      x-small
      @click="
        snackbar.show = false;
        this.$gtag.event('click', {
          event_label: 'close_snackbar',
          event_category: 'alert_interaction',
        });
      "
    >
      X
    </v-btn>
  </v-snackbar>

  <v-select
    align="center"
    :items="['chatter_info.count', 'created_date', 'updated_date']"
    label="Default"
    v-model="selectedSortOption"
  ></v-select>
  <v-radio-group v-model="displayChannelsInGrid" inline>
    <v-radio label="Carousel" value="carousel"></v-radio>
    <v-radio label="Grid" value="grid"></v-radio>
  </v-radio-group>

  <v-container align="center" justify="center" v-if="!loadedChannels">
    <v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
      @mouseover="
        this.$gtag.event('hover', {
          event_label: 'channels_loading_progress',
          event_category: 'user_impatience',
        })
      "
    ></v-progress-circular>
  </v-container>
  <div v-if="displayChannelsInGrid == 'carousel'">
    <v-carousel
      hide-delimiters
      cycle
      height="auto"
      @mouseover="
        $gtag.event('hover', {
          event_label: 'carousel',
          event_category: 'user_browsing_activity',
        })
      "
    >
      <v-carousel-item
        v-for="channel in sortedChannels"
        :key="channel.broadcaster_name"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-sheet align="center">
          <Profile :channel="channel" :show="show"></Profile>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
  <div v-else>
    <v-row class="three-cols">
      <v-col v-for="channel in sortedChannels" :key="channel.broadcaster_name">
        <Profile :channel="channel" :show="show"></Profile>
      </v-col>
    </v-row>
  </div>

  <v-divider></v-divider>
</template>
<script>
import Profile from "@/components/Profile.vue";
import axios from "axios";
export default {
  name: "Channels",
  components: { Profile },
  mounted() {
    this.getData();
  },
  data: () => ({
    snackbar: {
      show: false,
      grid: false,
    },
    displayChannelsInGrid: "carousel",
    channels: [],
    show: false,
    loadedChannels: false,
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    selectedSortOption: "updated_date", // Set an initial sorting option
  }),
  methods: {
    getData: function () {
      let response = axios
        .get(
          "https://api.stat-milestones.dev/live-channels?channel-id=?e93cf8730nd11z7gepkly2gry5kv8k"
        )
        .then((response) => {
          this.channels = response.data.channels;
          this.loadedChannels = true;
          this.snackbar.show = true;
        });
    },
    getPropertyValue: function (object, propertyPath) {
      const properties = propertyPath.split(".");
      let value = object;
      for (const prop of properties) {
        value = value[prop];
      }
      return value;
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
  computed: {
    sortedChannels() {
      const channelsCopy = [...this.channels]; // Make a copy of the channels array
      return channelsCopy.sort((a, b) => {
        const valueA = this.getPropertyValue(a, this.selectedSortOption);
        const valueB = this.getPropertyValue(b, this.selectedSortOption);
        // Compare the values based on the selected sorting option
        if (valueA > valueB) {
          return -1;
        }
        if (valueA < valueB) {
          return 1;
        }
        return 0;
      });
    },
  },
};
</script>
<style></style>
