import { shallowMount } from "@vue/test-utils";
import Starship from "@/components/Starships/Starship.vue";

let wrapper;
const shipData = {
  name: "Battlestar Galactica",
  model: "BX5000"
};

const createWrapper = (propsData = shipData) => {
  wrapper = shallowMount(Starship, {
    propsData
  });
};

describe("Starship.vue", () => {
  beforeEach(() => {
    createWrapper();
  });

  it("should render starship with name and model", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.contains(".starship")).toBeTruthy();
    expect(wrapper.find(".starship__title").text()).toBe(shipData.name);
    expect(wrapper.find(".starship__model").text()).toBe(shipData.model);
  });

  it("should not show most films star", () => {
    expect(wrapper.findAll(".starship__most-films").length).toBe(0);
  });

  it("should show most films star", () => {
    createWrapper({
      ...shipData,
      mostFilms: true
    });
    expect(wrapper.findAll(".starship__most-films").length).toBe(1);
  });
});
