import starships from "@/store/modules/starships";
import { mergeShipsAndFilms, normalizeStarshipsData } from "@/store/modules/starships";
import ships from "./starshipData";
import films from "./filmData";
const starshipsApi = require.requireMock("@/api/api");

jest.mock("@/api/api", () => {
  return {
    starshipsAndFilmApi: jest.fn(() => mockPromise)
  };
});

const mergedShips = mergeShipsAndFilms(ships.results, films.results);
const normalizedShips = normalizeStarshipsData(mergedShips);

describe("starships store module", () => {
  it("should set starship loaded state", () => {
    const state = { loaded: false };
    starships.mutations.setStarshipsLoaded(state);
    expect(state.loaded).toBeTruthy();
  });

  it("should return loaded state", () => {
    const state = { loaded: true };
    const loaded = starships.getters.getShipsLoaded(state)();
    expect(loaded).toBeTruthy();
  });

  it("should set starship data to state", () => {
    const state = {};
    const ships = { results: ["ship1", "ship2", "ship3"] };
    starships.mutations.setStarshipsData(state, ships);
    expect(state.results.length).toBe(3);
    expect(state.results[1]).toBe("ship2");
  });

  it("should fetch starships with films from api", async () => {
    const commit = jest.fn();
    starshipsApi.starshipsAndFilmApi.mockResolvedValue([ships.results, films.results]);
    await starships.actions.fetchStarships({ commit });
    expect(commit).toHaveBeenCalledWith("setStarshipsData", normalizedShips);
  });

  it("should merge ships and film data", () => {
    expect(mergedShips[0].films[0].title).toBe("The Empire Strikes Back");
    expect(mergedShips[4].films[2].title).toBe("A New Hope");
  });

  it("should normalise starship data", () => {
    const normalizedShip = {
      name: "Executor",
      model: "Executor-class star dreadnought",
      crew: 279144,
      passengers: 38000,
      films_count: 2,
      films: [
        {
          director: "Irvin Kershner",
          release_date: "1980-05-17",
          title: "The Empire Strikes Back"
        },
        { director: "Richard Marquand", release_date: "1983-05-25", title: "Return of the Jedi" }
      ]
    };
    expect(normalizedShips.results[0]).toEqual(normalizedShip);
  });

  it("should get sorted starships by crew", () => {
    const state = normalizedShips;
    const ships = starships.getters.getShipsOrderedByCrewWithMin(state)();
    expect(ships.length).toEqual(3);
    expect(ships[0].crew).toEqual(342953);
    expect(ships[1].crew).toEqual(279144);
    expect(ships[2].crew).toEqual(854);
  });

  it("should remove ships less than max crew input", () => {
    const state = normalizedShips;
    const ships = starships.getters.getShipsOrderedByCrewWithMin(state)(1000);
    expect(ships.length).toEqual(2);
  });

  it("should return empty results when there is a data issue", () => {
    const state = {};
    const ships = starships.getters.getShipsOrderedByCrewWithMin(state)(10);
    expect(ships).toEqual([]);
  });
});
