<template>
  <v-toolbar rounded color="deep-purple-accent-3">
    <v-toolbar-title color="white">Extension User Metrics</v-toolbar-title>
  </v-toolbar>

  <div v-if="totalUsers > 0">
    <v-container>
      <v-row>
        <v-col>
          <AnimatedNumber
            :targetNumber="totalUsers"
            :animationDuration="1000"
            :animationIncr="35"
            :title="'Total Users'"
          />
        </v-col>

        <v-col>
          <AnimatedNumber
            :targetNumber="totalInstallsLastThirtyDays"
            :animationDuration="3000"
            :animationIncr="1"
            :title="`Installs in the last 30 days`"
          />
        </v-col>

        <v-col>
          <AnimatedNumber
            :targetNumber="totalUpdatesLastThirtyDays"
            :animationDuration="3000"
            :animationIncr="1"
            :title="`Updates in the last 30 days`"
          />
        </v-col>

        <v-col>
          <AnimatedNumber
            :targetNumber="channels.length"
            :animationDuration="3500"
            :animationIncr="1"
            :title="`Total Live Streamers`"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>

  <v-toolbar rounded color="deep-purple-accent-3"></v-toolbar>
  
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
    Loading Extension User Metrics
  </v-container>
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
    <v-card>
      <template v-slot:title>
        Twitch Streamers Online: {{ channels.length }}
      </template>
    </v-card>

    <v-container></v-container>

    <v-btn-toggle
      v-model="displayChannelsFormat"
      rounded="0"
      color="deep-purple-accent-3"
      group
      mandatory
    >
      <v-btn value="carousel"> Carousel </v-btn>

      <v-btn value="grid" @click="listItemPage = 3"> Grid </v-btn>

      <v-btn value="list" @click="listItemPage = 5"> List </v-btn>
    </v-btn-toggle>

    <v-container></v-container>
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
    <v-container align="center">
      <v-row>
        <v-col></v-col>
        <v-col md="4" class="pa-3 d-flex flex-column">
          <v-text-field
            v-model="search"
            clearable
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            style="max-width: 300px"
          ></v-text-field>
        </v-col>

        <v-col md="4" class="pa-3 d-flex flex-column">
          <v-select
            align="center"
            :items="['chatter_info.count', 'created_date', 'updated_date']"
            label="Sort By"
            v-model="selectedSortOption"
          ></v-select
        ></v-col>
        <v-col></v-col>
      </v-row>
    </v-container>

    <v-data-iterator
      :items="sortedChannels"
      :items-per-page="listItemPage"
      :search="search"
    >
      <template v-slot:default="{ items }">
        <v-row class="ma-2">
          <v-col
            md="4"
            class="pa-3 d-flex flex-column"
            v-for="item in items"
            :key="item.raw.broadcaster_name"
          >
            <v-container
              @click="
                dialogProfile = item.raw;
                displayProfile = true;
              "
              :style="'cursor: pointer;'"
            >
              <Profile
                :channel="item.raw"
                :show="show"
                :display="false"
              ></Profile>
            </v-container>
          </v-col>
          <v-col></v-col>
        </v-row>
      </template>
    </v-data-iterator>

    <v-row align="center">
      <v-col>
        <v-container
          v-if="loadedChannels && this.listItemPage < this.channels.length"
        >
          <v-btn @click="listItemPage += 3">Load More</v-btn></v-container
        >
      </v-col>
    </v-row>
  </div>
  <div v-if="displayChannelsFormat == 'list'">
    <v-container align="center">
      <v-row>
        <v-col></v-col>
        <v-col md="4" class="pa-3 d-flex flex-column">
          <v-text-field
            v-model="search"
            clearable
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            style="max-width: 300px"
          ></v-text-field>
        </v-col>

        <v-col md="4" class="pa-3 d-flex flex-column">
          <v-select
            align="center"
            :items="['chatter_info.count', 'created_date', 'updated_date']"
            label="Sort By"
            v-model="selectedSortOption"
          ></v-select
        ></v-col>
        <v-col></v-col>
      </v-row>
    </v-container>

    <v-data-iterator
      :items="sortedChannels"
      :items-per-page="listItemPage"
      :search="search"
    >
      <template v-slot:default="{ items }">
        <template v-for="item in items" :key="item.broadcaster_name">
          <Profile :channel="item.raw" :show="show" :display="true"></Profile>
        </template>
      </template>
    </v-data-iterator>

    <v-container
      v-if="loadedChannels && this.listItemPage < this.channels.length"
    >
      <v-btn @click="listItemPage += 10">Load More</v-btn></v-container
    >
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
import AnimatedNumber from "@/components/AnimatedNumber.vue";

import axios from "axios";

const pageSize = 10;

export default {
  name: "Channels",
  components: { Profile, AnimatedNumber },
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
    search: "",
    listItemPage: 10,
    totalUsers: 0,
    totalInstallsLastThirtyDays: 0,
    totalUpdatesLastThirtyDays: 0,
    totalStreamers: 0,
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
          this.totalInstallsLastThirtyDays =
            response.data.userMetrics.totalInstallsLastThirtyDays;
          this.totalUsers = response.data.userMetrics.totalUsers;
          this.totalUpdatesLastThirtyDays = response.data.userMetrics
            .totalUpdatesLastThirtyDays;
          this.totalStreamers = response.data.total;
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
  watch: {},
};
</script>
<style></style>
