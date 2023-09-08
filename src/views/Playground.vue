  <template>
  <v-toolbar rounded color="deep-purple accent-1">
    <v-toolbar-title color="white">PLAYGROUND</v-toolbar-title>
  </v-toolbar>
  <v-container>
    <iframe
      id="ifrm"
      src="https://playground.stat-milestones.dev"
      width="1500px"
      height="950px"
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
<style></style>