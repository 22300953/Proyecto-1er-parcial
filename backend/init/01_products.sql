CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  image_url TEXT,
  category VARCHAR(80) NOT NULL,
  description TEXT,
  in_stock BOOLEAN DEFAULT TRUE
);

INSERT INTO products (name, price, image_url, category, description, in_stock)
VALUES
  ('Pastel de chocolate', 320.00, 'pastel-chocolate.jpg', 'Pastel', '8 porciones', TRUE),
  ('Gelatina de fresa', 120.00, 'gelatina-fresa.jpg', 'Gelatina', '6 porciones', TRUE),
  ('Galletas surtidas', 95.00, 'galletas.jpg', 'Galleta', '12 piezas', TRUE)
ON CONFLICT DO NOTHING;
