const { Router } = require('express');
const express = require('express');
const { getTypes } = require('../controllers/getTypes')


const router = express.Router();

router.get('/', async (req, res) => {
    const types = await getTypes()
    try {
        res.status(200).send(types)
    } catch (error) {
        res.status(404).send(error.message);
    }
})











module.exports = router;