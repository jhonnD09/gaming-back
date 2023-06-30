const { Videogame } = require("../db");

const createVideoGame = async ({
  name,
  description,
  platforms,
  background_image,
  released,
  rating,
  genres,
}) => {
  if (
    !name ||
    !description ||
    !platforms ||
    !background_image ||
    !released ||
    !rating
  )
    throw new Error("Faltan Datos");

  const game = await Videogame.create({
    name: name,
    description: description,
    platforms: platforms,
    background_image: background_image,
    released: released,
    rating: rating,
    createInDb: true,
  });

  await game.addGenres(genres);

  return game;
};

module.exports = createVideoGame;
