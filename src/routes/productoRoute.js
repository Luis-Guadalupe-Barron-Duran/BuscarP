const express = require('express');
const { buscarProductos, obtenerp } = require('../controllers/externalController');
const router = express.Router();

router.get('/productos/search', buscarProductos);
router.get('/productos', obtenerp);

module.exports = router;