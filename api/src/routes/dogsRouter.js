const { Router } = require("express");
const { Dogs, Temperaments } = require("../db");
const { getAllDogs } = require("../controllers/dogscontrollers");
const router = Router();

router.get("/", async (req, res) => {
  const name = req.query.name;
  let dogsTotal = await getAllDogs();

  if (name) {
    let dogsName = dogsTotal.filter((element) =>
      element.name.toLowerCase().includes(name.toLowerCase())
    );
    if (dogsName.length) {
      res.status(200).send(dogsName);
    } else {
      res.status(404).send("El perro no está disponible");
    }
  } else {
    res.status(200).send(dogsTotal);
  }
});

router.post("/", async (req, res) => {
  let {
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    life_span,
    image,
    createdInDb,
    temperaments,
  } = req.body;

  if (!name || !heightMin || !heightMax || !weightMin || !weightMax) {
    res.status(400).send("Faltan campos obligatorios");
    return;
  }

  try {
    let dogCreated = await Dogs.create({
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      life_span,
      image,
      createdInDb,
      temperaments,
    });

    let temperamentDb = await Temperaments.findAll({
      where: { name: temperaments },
    });

    await dogCreated.addTemperaments(temperamentDb);

    res.send("Perro creado con éxito");
  } catch (error) {
    res.status(500).send("Error al crear el perro");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const dogsTotal = await getAllDogs();

  if (id) {
    let dogsId = dogsTotal.filter((element) => element.id === parseInt(id) || element.id === id);
    if (dogsId.length) {
      res.status(200).json(dogsId);
    } else {
      res.status(404).send("No se encontró el Perro");
    }
  }
});

module.exports = router;
