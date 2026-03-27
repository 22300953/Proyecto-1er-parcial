const { findAllProducts } = require('../models/product.model');

const getProducts = async (req, res, next) => {
  try {
    const products = await findAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
};
