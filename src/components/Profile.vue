<template>
  <v-container
    @mouseover="
      $gtag.event('hover', {
        event_label: channel.broadcaster_name,
        event_category: 'inspect_channel',
      })
    "
  >
    <v-sheet
      align="center"
      justfiy="center"
      color="white"
      elevation="14"
      height="auto"
      outlined
      rounded
    >
      <v-lazy
        v-model="channel.isActive"
        :options="{
          threshold: 1,
        }"
        class="fill-height"
      >
        <v-card outlined>
          <v-toolbar
            :color="channel.configuration.panel_settings.background_colour"
            elevation="4"
            flat
            outlined
            rounded
            :style="'cursor: pointer;'"
          >
            <v-avatar>
              {{ darkModeEmoji }}
            </v-avatar>
            <v-toolbar-title @click="openProfile(channel.broadcaster_name)"
              ><b
                :style="
                  `color:` +
                  channel.configuration.panel_settings.font_colour +
                  ';'
                "
              >
                {{ channel.broadcaster_name }}
              </b>
            </v-toolbar-title>

            <v-avatar>
              <img :src="channel.profile" :alt="channel.broadcaster_id" />
            </v-avatar>
          </v-toolbar>

          <v-card-title
            >{{ channel.game_name }}
            <v-card-subtitle>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              Last Updated:
              <b>{{ channel.updated_date }}</b>
            </v-card-subtitle>
          </v-card-title>

          <v-card-text>
            <v-divider></v-divider>
            <v-container>
              <v-container
                align="center"
                justify="center"
                v-if="!iframe.loaded && display"
              >
                <v-progress-circular
                  :size="30"
                  :width="7"
                  color="deep-purple-accent-3"
                  indeterminate
                ></v-progress-circular>
                Loading Twitch Video...
              </v-container>

              <v-container></v-container>

              <v-container v-if="!display">
                <v-img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBJKdY60KGUY-Ebe77-HkB-UkNmzBxELFMjw&usqp=CAU"
                  height="300px"
                  width="500px"
                >
                </v-img>
              </v-container>
              <v-container v-if="display">
                <iframe
                  @load="load"
                  v-show="iframe.loaded"
                  v-bind:src="
                    `https://player.twitch.tv/?channel=` +
                    channel.broadcaster_name +
                    `&parent=stat-milestones.dev&autoplay=false`
                  "
                  @mouseover="
                    $gtag.event('hover', {
                      event_label: channel.broadcaster_name + '_video',
                      event_category: 'inspect_channel',
                    })
                  "
                  @click="
                    $gtag.event('click', {
                      event_label: channel.broadcaster_name + '_video',
                      event_category: 'inspect_channel',
                    })
                  "
                  allowfullscreen
                  height="300px"
                  width="500px"
                >
                </iframe>
              </v-container>
            </v-container>
            <v-container align="center">
              <span
                v-if="
                  !channel.configuration.motd ||
                  channel.configuration.motd.msg == ''
                "
              >
                {{ channel.title }}
              </span>
              <span v-else>{{ channel.configuration.motd.msg }}</span>
            </v-container>
            <v-divider></v-divider>
            <v-container>
              # Twitch Chatters: {{ channel.chatter_info.count }}
            </v-container>
            <v-divider></v-divider>
            <v-container>
              Installed:
              <b>{{ channel.created_date }}</b>
            </v-container>
          </v-card-text>
        </v-card>
      </v-lazy>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: "Profile",
  data: () => ({
    iframe: {
      loaded: false,
    },
    darkModeEmoji: "☀️",
  }),
  props: {
    channel: {},
    display: Boolean,
  },
  methods: {
    load: function () {
      this.iframe.loaded = true;
      if (this.channel.configuration.panel_settings.dark_mode) {
        this.darkModeEmoji = "🌙";
      }
    },
    openProfile(username) {
      this.$gtag.event("click", { event_label: "profile-title" });
      window.open("https://twitch.tv/" + username + "/about", "_blank");
    },
  },
};
</script>
<style scoped></style>
