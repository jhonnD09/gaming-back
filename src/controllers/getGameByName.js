const getGameByNameApi = require("./getGameByNameApi");
const getGameByNameDB = require("./getNameByNameDB");

const getGameByName = async (name) => {
  const videoGameApi = await getGameByNameApi(name);
  const videoGameDB = await getGameByNameDB(name);

  if (!videoGameApi.length && !videoGameDB.length)
    throw new Error("The video game you are looking for does not exist");
  const results = [...videoGameDB, ...videoGameApi];
  return results;
};
module.exports = getGameByName;
