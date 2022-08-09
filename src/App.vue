

<template>
  <div>
    <router-link to="/">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  setup() {
    const route = inject('route')
    const router = inject('router')
    return {}
  }
  // mounted() {
  //   console.log(this.$route)
  //   console.log(this.$router)
  // }
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
