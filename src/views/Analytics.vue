<template>
  <v-toolbar rounded color="deep-purple-accent-3">
    <v-toolbar-title color="white">EXTENSION ANALYTICS</v-toolbar-title>
  </v-toolbar>
  <v-container fluid style="height: 100vh">
    <iframe
      src="https://twitchinsights.net/extension/e93cf8730nd11z7gepkly2gry5kv8k"
      width="100%"
      height="100%"
      allowfullscreen
      id="myFrame"
    ></iframe>
  </v-container>
</template>

<script>
export default {
  name: "Analytics",
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
