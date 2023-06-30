const axios = require("axios");
const URL = "https://api.rawg.io/api";
require("dotenv").config();
const { KEY } = process.env;
const { Videogame, Genre } = require("../db");

const getAllVideoGames = async () => {
  const getAllGamesDb = await Videogame?.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  let gameArray = [];

  let next = `https://api.rawg.io/api/games?key=${KEY}`;

  // const response = await axios.get(`${URL}/games?key=${KEY}`);

  for (var i = 1; i < 6; i++) {
    let videoGamesApi = await axios.get(next);
    next = videoGamesApi.data.next;
    let data = videoGamesApi.data.results;
    const gamesAllApi = data.map((game) => {
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
    gameArray.push(gamesAllApi);
  }
  const vGames = gameArray.flat();
  return [...getAllGamesDb, ...vGames];
};

module.exports = getAllVideoGames;
