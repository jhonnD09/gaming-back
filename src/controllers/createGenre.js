const { Genre } = require("../db");

const createGenre = async ({ apiId, name }) => {
  const newGenre = await Genre.create({
    apiId,
    name,
  });

  return newGenre;
};

module.exports = createGenre;
