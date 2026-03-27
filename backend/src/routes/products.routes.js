const express = require('express');
const { getProducts } = require('../controllers/products.controller');

const router = express.Router();

router.get('/products', getProducts);
// Alias para mantener compatibilidad con ejemplos de clase.
router.get('/productos', getProducts);

module.exports = router;
