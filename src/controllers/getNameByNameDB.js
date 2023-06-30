const { Op, iLike } = require("sequelize");
const { Videogame, Genre } = require("../db");

const getGameByNameDB = async (name) => {
  const getGameDb = await Videogame?.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return getGameDb;
};
module.exports = getGameByNameDB;
