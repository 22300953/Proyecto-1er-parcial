const db = require('../config/db');

const PRODUCTS_QUERY = `
  SELECT
    id,
    name,
    price,
    image_url AS "imageUrl",
    category,
    description,
    COALESCE(in_stock, true) AS "inStock"
  FROM products
  ORDER BY id;
`;

const LEGACY_PRODUCTS_QUERY = `
  SELECT
    id,
    nombre AS name,
    precio AS price,
    imagen AS "imageUrl",
    categoria AS category,
    descripcion AS description,
    COALESCE(disponible, true) AS "inStock"
  FROM productos
  ORDER BY id;
`;

const findAllProducts = async () => {
  try {
    const result = await db.query(PRODUCTS_QUERY);
    return result.rows;
  } catch (error) {
    // Fallback para bases de datos con esquema legado en espanol.
    if (error.code !== '42P01') {
      throw error;
    }

    const legacyResult = await db.query(LEGACY_PRODUCTS_QUERY);
    return legacyResult.rows;
  }
};

module.exports = {
  findAllProducts,
};
