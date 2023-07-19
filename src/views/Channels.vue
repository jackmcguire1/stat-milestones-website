<template>
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

    <v-container></v-container>
  </v-container>
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
      :items="['chatter_info.count', 'created_date', 'updated_date']"
      label="Choose sort option"
      v-model="selectedSortOption"
  ></v-select>

  <v-select
      :items="['desc', 'asc']"
      label="Sort By..."
      v-model="selectedSortOperator"
  ></v-select>
  
  <v-virtual-scroll height="700" item-height="700" :items="channels">
    <v-row>
      <div v-for="channel in orderedChannels">
        <Profile :channel="channel" :show="show"></Profile>
      </div>
    </v-row>
  </v-virtual-scroll>

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
    },
    channels: [],
    show: false,
    loadedChannels: false,
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    selectedSortOption: 'chatter_info.count', // Set an initial sorting option
    selectedSortOperator: 'desc'
  }),
  methods: {
    getData: function () {
      let response = axios
        .get(
          "https://0u3uqckeqf.execute-api.us-east-1.amazonaws.com/Prod/live-channels?channel-id=?e93cf8730nd11z7gepkly2gry5kv8k"
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
  computed: {
   orderedChannels: function () {
    return _.orderBy(this.channels, this.selectedSortOption)
   }
  },
};
</script>
<style>
</style>
