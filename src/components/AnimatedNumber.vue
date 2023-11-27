<template>
  <v-card>
    <v-card-title class="headline">
      {{ title }}:
      <span class="animated-number">{{ animatedNumber.toLocaleString() }}</span>
    </v-card-title>
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
</style>