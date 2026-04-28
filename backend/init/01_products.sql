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
  ('Pastel de chocolate', 320.00, 'pastel4.jpeg', 'Pastel', '8 porciones', TRUE),
  ('Pastel de fresa', 305.00, 'pastel2.jpeg', 'Pastel', '8 porciones', TRUE),
  ('Pastel de limón', 295.00, 'pastel3.jpeg', 'Pastel', '8 porciones', TRUE),
  ('Pastel de vainilla', 290.00, 'pastel1.jpeg', 'Pastel', '8 porciones', TRUE),
  ('Pastel de frutas', 330.00, 'pastel5.jpeg', 'Pastel', '10 porciones', TRUE),
  ('Chocoflan', 260.00, 'chocoflan.webp', 'Postre', '7 porciones', TRUE),
  ('Pastel de chocofresa', 340.00, 'chocofresa.png', 'Pastel', '8 porciones', TRUE),
  ('Pay de frambuesa', 235.00, 'paydeframbuesa.webp', 'Pay', '8 porciones', TRUE),
  ('Pay de fruta', 225.00, 'paydefruta.webp', 'Pay', '8 porciones', TRUE),
  ('Rollo de canela', 145.00, 'roldecanela.webp', 'Pan', '6 piezas', TRUE),
  ('Macarrons surtidos', 180.00, 'macarrons.webp', 'Galleta', '12 piezas', TRUE),
  ('Pan dulce', 90.00, 'pan_dulce.webp', 'Pan', '10 piezas', TRUE),
  ('Gelatina de mango', 130.00, 'gelatinamango.webp', 'Gelatina', '6 porciones', TRUE),
  ('Frutas surtidas', 140.00, 'frutas.webp', 'Otro', '1 porción', TRUE),
  ('Galletas surtidas', 95.00, 'galletas_surtidas.jpg', 'Galleta', '12 piezas', TRUE)
ON CONFLICT DO NOTHING;
