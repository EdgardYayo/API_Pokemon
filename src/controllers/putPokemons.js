const { Pokemon, Type } = require('../db')



const putPokemons = async (id, name, img) => {
    const pokemonDb = await Pokemon.findByPk(id)
    pokemonDb.update({
        name: name,
        img: img
    })
    return pokemonDb  
}


module.exports = {
    putPokemons
}