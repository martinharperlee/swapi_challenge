<template>
  <article class="starship">
    <header class="starship__header">
      <h2 class="starship__title">{{ name }}</h2>
      <p class="starship__model">{{ model }}</p>
      <img
        v-if="mostFilms"
        class="starship__most-films"
        alt="Most Films"
        src="../../assets/star.gif"
      />
    </header>
    <span class="starship__meta">
      <Stat title="Crew" :figure="crew" />
      <Stat title="Passengers" :figure="passengers" />
      <Stat title="Films" :figure="films_count" />
    </span>
  </article>
</template>

<script>
import Stat from "../Stat/Stat";
export default {
  name: "Starship",
  props: {
    name: {
      requied: true,
      type: String
    },
    model: String,
    crew: Number,
    passengers: Number,
    films_count: Number,
    mostFilms: {
      default: false,
      type: Boolean
    }
  },
  components: {
    Stat
  }
};
</script>

<style scoped lang="scss">
.starship {
  $spaceY: 15px;
  $spaceX: 20px;
  border: solid 1px;
  padding: $spaceY $spaceX;
  margin: $spaceY $spaceX;
  height: calc(100% - (#{$spaceY * 4}));

  &__header {
    position: relative;
    padding-right: 40px;
  }

  &__title {
    font-size: 20px;
    margin: 0 0 10px 0;
  }

  &__most-films {
    position: absolute;
    width: 30px;
    top: 0;
    right: 0;
  }

  &__model {
    font-size: 12px;
    margin: 0 0 $spaceY 0;
  }

  &__meta {
    display: block;
    padding: 10px 0 0;
    border-top: solid 1px #cecece;
  }
}
</style>
