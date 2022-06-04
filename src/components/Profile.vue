<template>
  <v-container>
    <v-sheet
      color="white"
      elevation="14"
      height="700"
      outlined
      rounded
      width="600"
    >
      <v-container>
        <v-card class="mx-auto">
          <v-toolbar color="purple" elevation="4" flat outlined rounded>
            <v-toolbar-title>
              <b> {{ channel.broadcaster_name }} </b>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <v-avatar>
              <img :src="channel.profile" :alt="channel.broadcaster_id" />
            </v-avatar>
          </v-toolbar>

          <v-card-title> {{ channel.game_name }} </v-card-title>

          <v-card-text>
            <v-divider></v-divider>
            <v-container>
              <iframe
                v-bind:src="
                  `https://player.twitch.tv/?channel=` +
                  channel.broadcaster_name +
                  `&parent=jackmcguire1.github.io&autoplay=false`
                "
                allowfullscreen
                height="300px"
                width="500px"
              >
              </iframe>
            </v-container>
            <v-container align="center"> {{ channel.title }}</v-container>
            <v-divider></v-divider>
            <v-container> Viewers: {{ channel.viewers }}</v-container>
            <v-divider></v-divider>
            <v-container>
              Twitch Partnership Status:
              <b>{{ channel.type.toUpperCase() }}</b></v-container
            >
          </v-card-text>
        </v-card>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: "Profile",
  data: () => ({
  }),
  props: {
    channel: {},
    show: Boolean,
  },
};
</script>
<style scoped>
</style>