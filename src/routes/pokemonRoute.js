const { Router } = require('express');
const express = require('express');
const { getDetail, getAllPokemons } = require('../controllers/getPokemons');
const { Pokemon, Type } = require('../db');
const { putPokemons } = require('../controllers/putPokemons')
const { deletePokemon } = require('../controllers/deletePokemon')


const router = express.Router();

router.get('/', async (req, res) => {
  const { name } = req.query;
  const pokemones = await getAllPokemons();
  try {
    if(name){
      let poke = pokemones.filter(p => p.name.toLowerCase() === name.toLowerCase())
      poke.length ? res.status(200).send(poke): res.status(404).send("Pokemon not found")
    } else {
      res.status(200).send(pokemones);
    }
        
  } catch (error) {
       res.status(400).send(error.message) 
  }
})


router.get('/:id', async (req, res) => {
  const { id }  = req.params;
  const pokeDetail = await getDetail(id)
  try {
    res.status(200).send(pokeDetail)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

router.post('/', async (req, res) => {
  const { name, hp, attack, defense, img, types, height, weight, speed } = req.body
  try {
    if(name) {
      const all = await getAllPokemons()
      const thePoke = all.filter(p => p.name === name.toLowerCase())
      if(thePoke.length === 0) {
          const newPokemon = await Pokemon.create({
              name,
              hp,
              attack,
              defense,
              speed,
              height,
              weight,
              img 
          });

          const typeDb = await Type.findAll({
              where: {
                  name: types
              }
          })

          newPokemon.addType(typeDb);
           return res.status(201).send(newPokemon)
      }
      return res.status(404).send("That pokemon name already exist")
  }
  if(!name) return res.status(404).send("Pokemon name is obligatory")
  } catch (error) {
    res.status(404).send(error.message);
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { name, img } = req.body
  try {
    if( !name || !img ){
      res.status(400).send('The name and image is needed to modify the pokemon')
    } else {
      const modify = await putPokemons(id, name, img)
      res.status(200).send("Pokemon modified")
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const deleted = await deletePokemon(id)
    res.status(200).send('Pokemon deleted')
  } catch (error) {
    res.status(400).send(error.message)
  }
})

module.exports = router;