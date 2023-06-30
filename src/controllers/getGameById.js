const axios = require("axios");
require("dotenv").config();
const { Videogame, Genre } = require("../db");
const URL = "https://api.rawg.io/api";
const { KEY } = process.env;

const getGameById = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    const getGameDb = await Videogame.findByPk(id, {
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return res.status(200).json(getGameDb);
  }

  axios
    .get(`${URL}/games/${id}?key=${KEY}`)
    .then((response) => {
      const {
        id,
        name,
        description,
        platforms,
        background_image,
        released,
        rating,
        genres,
      } = response.data;
      const videoGameApi = {
        id,
        name,
        description,
        platforms: platforms
          .map((platform) => platform.platform.name)
          .join(", "),
        background_image,
        released,
        rating,
        genres: genres.map((elem) => elem.name).join(", "),
      };

      return res.status(200).json(videoGameApi);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};
module.exports = getGameById;
