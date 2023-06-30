const axios = require("axios");
const URL = "https://api.rawg.io/api";
require("dotenv").config();
const { KEY } = process.env;

const getAllPlatforms = async () => {
  const response = await axios.get(`${URL}/platforms?key=${KEY}`);
  const allPlatforms = response.data.results.map((platform) => {
    return {
      name: platform.name,
    };
  });

  return allPlatforms;
};

module.exports = getAllPlatforms;
