const { Genre } = require("../db");
const axios = require("axios");
const URL = "https://api.rawg.io/api";
require("dotenv").config();
const { KEY } = process.env;

const getAllGenres = async () => {
  let genresDB = await Genre.findAll();

  if (genresDB.length === 0) {
    const response = await axios.get(`${URL}/genres?key=${KEY}`);
    let allGenresApi = response.data.results.map((elem) => {
      return {
        apiId: elem.id,
        name: elem.name,
      };
    });

    await Genre.bulkCreate(allGenresApi);
    return allGenresApi;
  }
  return genresDB;
};

module.exports = getAllGenres;
