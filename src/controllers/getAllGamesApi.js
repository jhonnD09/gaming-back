const axios = require("axios");
// const URL = "https://api.rawg.io/api";
require("dotenv").config();
const { KEY } = process.env;

const getAllGamesApi = async (URL, videoGa = []) => {
  if (videoGa.length === 100) return videoGa;

  const { next, results } = (await axios.get(URL)).data;

  results.foreach((game) => {
    if (videoGa.length < 100)
      videoGa.push({
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
      });
  });

  return getAllGamesApi(next, videoGa);
};

module.exports = getAllGamesApi;
