<template>
  <span class="stat" v-if="title && figure">
    <p class="stat__figure">{{ figure }}</p>
    <p class="stat__title">{{ title }}</p>
  </span>
</template>

<script>
export default {
  name: "Stat",
  props: ["title", "figure"]
};
</script>

<style scoped lang="scss">
.stat {
  display: inline-block;
  margin-right: 25px;
  text-align: center;

  &__figure {
    font-size: 20px;
    margin: 5px 0 5px;
  }

  &__title {
    color: #9e9e9e;
    font-size: 10px;
    margin: 0;
  }
}
</style>
