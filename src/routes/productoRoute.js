const express = require('express');
const { buscarProductos } = require('../controllers/externalController');
const router = express.Router();

router.get('/productos/search', buscarProductos);

module.exports = router;