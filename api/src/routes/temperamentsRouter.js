const { Router } = require("express");
const axios = require("axios");
const { API_KEY } = process.env;
const { Temperaments } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    let dogsApi = (
      await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)
    ).data
      .map((el) => el.temperament)
      .toString(); // me trae un string con todos los temp separados por comas
    dogsApi = dogsApi.split(",");
    const tempsConEspacio = dogsApi.map((el) => {
      if (el[0] === " ") {
        return el.split(" ");
      }
      return el;
    });
    const tempsSinEspacio = tempsConEspacio.map((el) => {
      if (Array.isArray(el)) {
        el.shift();
        return el.join(" ");
      }
      return el;
    });

    tempsSinEspacio.forEach(async (el) => {
      if (el !== "") {
        await Temperaments.findOrCreate({
          where: {
            name: el,
          },
        });
      }
    });

    const allTemps = await Temperaments.findAll();
    res.status(200).send(allTemps);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
