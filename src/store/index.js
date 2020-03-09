import Vue from "vue";
import Vuex from "vuex";
import starships from "./modules/starships";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    starships
  }
});
