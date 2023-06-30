const axios = require("axios");
require("dotenv").config();
const { KEY } = process.env;
const URL = "https://api.rawg.io/api";

const getGameByNameApi = async (name) => {
  const response = await axios.get(`${URL}/games?key=${KEY}&search=${name}`);
  const game = response.data.results.map((game) => {
    return {
      id: game.id,
      name: game.name,
      description: game.description,
      platforms: game.platforms
        .map((platform) => platform.platform.name)
        .join(", "),
      background_image: game.background_image,
      released: game.released,
      rating: game.rating,
      genres: game.genres.map((elem) => elem.name).join(", "),
    };
  });
  return game;
};
module.exports = getGameByNameApi;
