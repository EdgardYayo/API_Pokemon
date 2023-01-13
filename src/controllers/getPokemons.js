const axios = require('axios')
const { Pokemon, Type } = require('../db');


const getApiInfo = async () => {
  let URL = "https://pokeapi.co/api/v2/pokemon"
  let pokemones = [];
  do {
    const apiInfo = await axios.get(URL)
    const dataInfo = apiInfo.data
    const resultsApi = await dataInfo.results.map(p => {
      return {
        name: p.name,
        url: p.url
      }     
    })
    pokemones.push(...resultsApi);
    URL = dataInfo.next;
  } while ( URL != null && pokemones.length < 140);

  let pokemonData = await Promise.all(pokemones.map( async p => {
    let poke = await axios.get(p.url);
    return {
      id: poke.data.id,
      name: poke.data.name,
      img: poke.data.sprites.other.dream_world.front_default,
      types: poke.data.types.map(t => {
        return ({
          name: t.type.name,
        })
      }),
      hp: poke.data.stats[0].base_stat,
      attack: poke.data.stats[1].base_stat,
      defense: poke.data.stats[2].base_stat,
      speed: poke.data.stats[5].base_stat,
      height: poke.data.height,
      weight: poke.data.weight
    }
  }))
  return pokemonData;
}


const getDetail = async (id) => {
  if(!isNaN(id)){
    const apiData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemon = apiData.data
    const pokemonData = {
      id: pokemon.id,
      name: pokemon.name,
      img: pokemon.sprites.other.dream_world.front_default,
      types: pokemon.types.map(t => {
        return ({
          name: t.type.name,
        })
      }),
      hp: pokemon.stats[0].base_stat,
      attack: pokemon.stats[1].base_stat,
      defense: pokemon.stats[2].base_stat,
      speed: pokemon.stats[5].base_stat,
      height: pokemon.height,
      weight: pokemon.weight
    }
    return pokemonData;
  }

  if(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)){
    const responseDb = await Pokemon.findByPk(id, {
      include: [
        {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    })
    return responseDb;
  }
}

const getDbInfo = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
      attribute:['name'],
      through: {
        attribute:[]
      }
    }
  })
}

const getAllPokemons = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const totalInfo = apiInfo.concat(dbInfo);
  return totalInfo;
}




module.exports = {
  getApiInfo,
  getDetail,
  getAllPokemons
}



