<template>
  <v-toolbar rounded color="deep-purple-accent-3">
    <v-toolbar-title color="white">LIVE TWITCH CHANNELS</v-toolbar-title>
  </v-toolbar>
  <v-snackbar
    :timeout="10000"
    color="deep-purple accent-4"
    elevation="100"
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

  <v-container>
    <v-select
      align="center"
      :items="['chatter_info.count', 'created_date', 'updated_date']"
      label="Sort By"
      v-model="selectedSortOption"
    ></v-select>

    <v-btn-toggle
      v-model="displayChannelsFormat"
      rounded="0"
      color="deep-purple-accent-3"
      group
      mandatory
    >
      <v-btn value="carousel"> Carousel </v-btn>

      <v-btn value="grid"> Grid </v-btn>

      <v-btn value="list"> List </v-btn>
    </v-btn-toggle>

    <v-container></v-container>

    <v-card>
      <template v-slot:title>
        Twitch Streamers Online: {{ channels.length }}
      </template>
    </v-card>
  </v-container>

  <v-container align="center" justify="center" v-if="!loadedChannels">
    <v-progress-circular
      :size="70"
      :width="7"
      color="deep-purple-accent-3"
      indeterminate
      @mouseover="
        this.$gtag.event('hover', {
          event_label: 'channels_loading_progress',
          event_category: 'user_impatience',
        })
      "
    ></v-progress-circular>
    Loading Twitch Channels
  </v-container>

  <div v-if="displayChannelsFormat == 'carousel'">
    <v-carousel
      v-model="currentSlide"
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
        eager
        v-for="channel in sortedChannels"
        :key="channel.broadcaster_name"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-sheet align="center">
          <Profile :channel="channel" :show="show" :display="true"></Profile>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
  <div v-if="displayChannelsFormat == 'grid'">
    <v-row class="three-column">
      <v-col v-for="channel in sortedGrid" :key="channel.broadcaster_name">
        <v-container
          @click="
            dialogProfile = channel;
            displayProfile = true;
          "
          :style="'cursor: pointer;'"
        >
          <Profile :channel="channel" :show="show" :display="false"></Profile>
        </v-container>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col> <v-btn @click="loadMore">Load More</v-btn></v-col>
    </v-row>
  </div>
  <div v-if="displayChannelsFormat == 'list'">
    <v-infinite-scroll :items="sortedChannels">
      <template
        v-for="channel in sortedChannels"
        :key="channel.broadcaster_name"
      >
        <v-container
          @click="
            dialogProfile = channel;
            displayProfile = true;
          "
          :style="'cursor: pointer;'"
        >
          <Profile :channel="channel" :show="show" :display="true"></Profile>
        </v-container>
        <v-container></v-container>
      </template>
    </v-infinite-scroll>
  </div>

  <v-container></v-container>
  <v-toolbar rounded color="deep-purple-accent-3"></v-toolbar>

  <v-dialog v-model="displayProfile">
    <v-card>
      <Profile :channel="dialogProfile" :show="show" :display="true"></Profile>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="danger"
          text
          @click="
            displayProfile = false;
            dialogProfile = {};
          "
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Profile from "@/components/Profile.vue";
import axios from "axios";

const pageSize = 10;

export default {
  name: "Channels",
  components: { Profile },
  mounted() {
    this.getData();
  },
  data: () => ({
    snackbar: {
      show: false,
    },
    cycle: true,
    currentSlide: 0,
    displayChannelsFormat: "carousel",
    channels: [],
    show: false,
    loadedChannels: false,
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    selectedSortOption: "updated_date", // Set an initial sorting option
    displayProfile: false,
    dialogProfile: {},
    gridItems: [],
    gridIndex: 0,
    gridBatchSize: 2,
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
          this.currentSlide = 1;
          this.totalChannelsCount = response.data.channels.length;
          this.gridItems.push(...this.channels.slice(0, this.gridBatchSize));
          this.gridIndex = this.gridBatchSize;
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
    loadMore() {
      this.gridItems.push(
        ...this.channels.slice(
          this.gridIndex,
          this.gridIndex + this.gridBatchSize
        )
      );
      this.gridIndex += this.gridBatchSize;
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
    sortedGrid() {
      const channelsCopy = [...this.gridItems]; // Make a copy of the channels array
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
