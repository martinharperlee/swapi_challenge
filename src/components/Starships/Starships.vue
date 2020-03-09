<template>
  <section class="starships">
    <h1 class="starships__title">Ships</h1>
    <ul class="starships__list" v-if="getShipsLoaded()">
      <li class="starships__list-item" v-for="(ship, index) in ships" v-bind:key="index">
        <Starship v-bind="ship" v-bind:mostFilms="getHighestFilmCount === ship.films_count" />
      </li>
    </ul>
    <p v-if="!getShipsLoaded()">...in a galaxy far, far away</p>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Starship from "./Starship";

export default {
  name: "Starships",
  components: {
    Starship
  },
  methods: {
    ...mapActions(["fetchStarships"])
  },
  computed: {
    ...mapGetters(["getShipsOrderedByCrewWithMin", "getShipsLoaded"]),
    ships() {
      return this.getShipsOrderedByCrewWithMin();
    },
    getHighestFilmCount() {
      return this.ships.reduce(
        (max, ship) => (ship.films_count > max ? ship.films_count : max),
        this.ships[0].films_count
      );
    }
  },
  created() {
    this.fetchStarships();
  }
};
</script>

<style scoped lang="scss">
.starships {
  padding: 0 20px;

  &__title {
    display: inline-block;
    background: #e0e0e0;
    padding: 10px 100px;
    margin: 20px 0;
    border-radius: 10px;
  }
  &__list {
    list-style-type: none;
    padding: 0;
    margin: 0 -20px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    &-item {
      display: block;
      width: 100%;
      @media (min-width: 600px) {
        width: 50%;
      }
      @media (min-width: 900px) {
        width: 33.33%;
      }
    }
  }
}
</style>
