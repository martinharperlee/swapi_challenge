<template>
  <div id="app">
    <Starships />
  </div>
</template>

<script>
import Starships from "./components/Starships/Starships.vue";

export default {
  name: "App",
  components: {
    Starships
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
