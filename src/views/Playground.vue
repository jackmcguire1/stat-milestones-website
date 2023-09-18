  <template>
  <v-toolbar rounded color="deep-purple-accent-3">
    <v-toolbar-title color="white">PLAYGROUND</v-toolbar-title>
  </v-toolbar>
  <v-container fluid>
    <iframe
      src="https://playground.stat-milestones.dev"
      width="100%"
      height="850px"
      allowfullscreen
    ></iframe>
  </v-container>
</template>

  <script>
export default {
  name: "Playground",
  mounted() {},
  data: () => ({}),
};
</script>
<style>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
}
.h_iframe iframe {
  width: 100%;
  height: 100%;
}
.h_iframe {
  height: 100%;
  width: 100%;
}
</style>