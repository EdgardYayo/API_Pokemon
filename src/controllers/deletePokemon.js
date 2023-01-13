const { Pokemon, Type } = require('../db')


const deletePokemon = async (id) => {
    const pokemon = await Pokemon.findByPk(id)
    pokemon.destroy()
    return pokemon
}


module.exports = {
    deletePokemon
}