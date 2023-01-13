const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getPokemons = require('../routes/pokemonRoute')
const getTypes = require('../routes/typeRoute')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', getPokemons)
router.use('/types', getTypes)


module.exports = router;
