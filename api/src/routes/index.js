const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const tempRouter = require("./temperamentsRouter.js");
const dogsRouter = require("./dogsRouter.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogsRouter);
router.use("/temperaments", tempRouter);

module.exports = router;
