<template>
  <v-card class="mx-auto my-8" max-width="344" rounded elevation="16">
    <v-card-item>
      <v-card-title> {{ title }} <v-container></v-container></v-card-title>
    </v-card-item>

    <v-card-text class="text-h2">
      <span class="animated-number">{{ animatedNumber.toLocaleString() }}</span>
      <v-container></v-container>
    </v-card-text>
  </v-card>

</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Total Users",
    },
    targetNumber: {
      type: Number,
      required: true,
    },
    animationDuration: {
      type: Number,
      default: 2000,
    },
    animationIncr: {
      type: Number,
      default: 35,
    },
  },
  data() {
    return {
      animatedNumber: 0,
    };
  },
  methods: {
    animateNumber() {
      const startNumber = 0;
      const interval =
        this.animationDuration / (this.targetNumber - startNumber);

      const counterInterval = setInterval(() => {
        this.animatedNumber += this.animationIncr;

        if (this.animatedNumber >= this.targetNumber) {
          this.animatedNumber = this.targetNumber;
          clearInterval(counterInterval);
        }
      }, interval);
    },
  },
  mounted() {
    this.animateNumber();
  },
};
</script>

<style scoped>
.animated-number {
  color: #4caf50; /* or any color you prefer */
  font-weight: bold;
}

.v-card {
  color: black;
  background: white;
}

</style>