const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getGameById = require("../controllers/getGameById");
const getAllVideoGames = require("../controllers/getAllVideoGames");
const getGameByName = require("../controllers/getGameByName");
const createVideoGame = require("../controllers/createVideoGame");
const getAllGenres = require("../controllers/getAllGenres");
const getAllPlatforms = require("../controllers/getAllPlatforms");
const createGenre = require("../controllers/createGenre");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", async (req, res) => {
  const { name } = req.query;
  try {
    const gameEncontrado = name
      ? await getGameByName(name)
      : await getAllVideoGames();
    res.status(200).json(gameEncontrado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/videogames", async (req, res) => {
  try {
    const {
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      genres,
    } = req.body;

    const gameCreated = await createVideoGame({
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      genres,
    });

    res.status(201).json(gameCreated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/genres", async (req, res) => {
  try {
    const allGenres = await getAllGenres();
    res.status(200).json(allGenres);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/videogames/:id", getGameById);

router.post("/createGenre", async (req, res) => {
  const { name, apiId } = req.body;

  try {
    const newGenre = await createGenre({ name, apiId });
    res.status(201).json(newGenre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/platforms", async (req, res) => {
  try {
    const allPlatforms = await getAllPlatforms();
    res.status(200).json(allPlatforms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
