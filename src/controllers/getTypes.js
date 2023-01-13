const axios = require('axios');
const { Type } = require('../db')


const getTypes = async () => {
    const axiosTypes = await axios.get("https://pokeapi.co/api/v2/type")
    const dataTypes = await axiosTypes.data;
    const types = dataTypes.results.map(t => t.name)
    types.forEach(type => {
        Type.findOrCreate({
            where:{
                name: type
            }
        })
    });
   const allTypes = await Type.findAll();
   return allTypes;
}

module.exports = {
    getTypes
}