import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Starships from "@/components/Starships/Starships.vue";
import Starship from "@/components/Starships/Starship.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

let wrapper;

const fetchStarships = jest.fn();
const shipsData = [
  {
    name: "star1",
    films_count: 2
  },
  {
    name: "star2",
    films_count: 2
  },
  {
    name: "star3",
    films_count: 5
  },
  {
    name: "star4",
    films_count: 4
  }
];
const createStore = ships =>
  new Vuex.Store({
    modules: {
      starships: {
        actions: {
          fetchStarships
        },
        getters: {
          getShipsOrderedByCrewWithMin: () => () => ships,
          getShipsLoaded: () => () => true
        }
      }
    }
  });

const createWrapper = (ships = shipsData) => {
  wrapper = shallowMount(Starships, {
    localVue,
    store: createStore(ships)
  });
};

describe("Starships.vue", () => {
  beforeEach(() => {
    createWrapper();
  });

  it("should render", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.contains(".starships")).toBeTruthy();
    expect(wrapper.contains(".starships__list")).toBeTruthy();
  });

  it("should fetch starships on created", () => {
    expect(fetchStarships).toHaveBeenCalled();
  });

  it("should render starships", () => {
    expect(wrapper.findAll(".starships__list-item").length).toEqual(4);
    expect(wrapper.findAll(Starship).length).toEqual(4);
  });

  it("should render different numbers of starships", () => {
    const ships = [
      ...shipsData,
      {
        name: "extraShip"
      },
      {
        name: "extraShip"
      }
    ];
    createWrapper(ships);
    expect(wrapper.findAll(".starships__list-item").length).toEqual(6);
    expect(wrapper.findAll(Starship).length).toEqual(6);
  });

  it("should return the greatest number of film appearances", () => {
    expect(wrapper.vm.getHighestFilmCount).toEqual(5);
  });
});
