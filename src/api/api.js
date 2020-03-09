import axios from "axios";

const apiDomain = "https://swapi.co/api/";
const starshipApiURL = `${apiDomain}starships`;
const filmApiURL = `${apiDomain}films`;
const pagesLeft = count => Math.ceil((count - 1) / 10);
const combineResponses = (soFar, response) =>
  response.reduce((acc, data) => [...acc, ...data.data.results], soFar);

const getAll = url => {
  // could have used the next links one after each other
  // by calculating number of pages, the remaining apis
  // calls are all loaded together
  // (relies on page length of 10)

  let set = [];

  return axios(url)
    .then(response => {
      set = response.data.results;
      return response.data.count;
    })
    .then(count => {
      const numberOfPagesLeft = pagesLeft(count);
      let promises = [];
      for (let i = 2; i <= numberOfPagesLeft; i++) {
        promises.push(axios(`${url}?page=${i}`));
      }
      return Promise.all(promises);
    })
    .then(response => {
      return combineResponses(set, response);
    });
};

export const starshipsAndFilmApi = async () => {
  try {
    const ships = getAll(starshipApiURL);
    const films = getAll(filmApiURL);
    return await Promise.all([ships, films]);
  } catch (err) {
    console.log(err.stack);
  }
};
