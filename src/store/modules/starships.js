import Vue from "vue";
import { starshipsAndFilmApi } from "@/api/api";

const state = {
  loaded: false
};

const normalizeFilm = ({ title, director, release_date }) => ({
  title,
  director,
  release_date
});

const normalizeStarships = ships =>
  ships.map(ship => ({
    name: ship.name,
    model: ship.model,
    crew: Number(ship.crew),
    passengers: Number(ship.passengers),
    films_count: ship.films.length,
    films: ship.films.map(film => normalizeFilm(film))
  }));

export const normalizeStarshipsData = ships => ({
  count: ships.length,
  results: normalizeStarships(ships)
});

export const mergeShipsAndFilms = (ships, films) =>
  ships.map(ship => ({
    ...ship,
    films: ship.films.map(filmUrl => films.find(film => film.url === filmUrl))
  }));

const actions = {
  fetchStarships: ({ commit }) => {
    starshipsAndFilmApi().then(data => {
      const shipsWithFilms = mergeShipsAndFilms(data[0], data[1]);
      commit("setStarshipsData", normalizeStarshipsData(shipsWithFilms));
      commit("setStarshipsLoaded");
    });
  }
};

const mutations = {
  setStarshipsData(state, data) {
    Vue.set(state, "results", data.results);
  },
  setStarshipsLoaded(state) {
    state.loaded = true;
  }
};

const getters = {
  getShipsLoaded: state => () => {
    return state.loaded;
  },
  getShipsOrderedByCrewWithMin: state => (maxCrew = 10) => {
    if (state.results === undefined) return [];
    const shipsWithMinCrew = state.results.filter(ship => ship.crew >= maxCrew);
    return shipsWithMinCrew.sort((ship1, ship2) => ship2.crew - ship1.crew);
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
