
/*
  # VETA FINA - Products Table

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text) - product name
      - `slug` (text, unique) - URL-friendly identifier
      - `description` (text) - full product description
      - `base_price` (numeric) - starting price
      - `category` (text) - e.g. 'sofa', 'mesa', 'silla'
      - `in_stock` (boolean) - availability flag
      - `stock_quantity` (integer) - units available
      - `featured` (boolean) - show in hero/featured section
      - `images` (jsonb) - array of image URLs
      - `wood_options` (jsonb) - array of {name, price_modifier} objects
      - `color_options` (jsonb) - array of {name, hex} objects
      - `dimensions` (jsonb) - {width, height, depth, unit}
      - `materials` (text[]) - list of materials used
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `products` table
    - Public read access for all products (storefront)
    - No public write access

  3. Sample Data
    - Insert demo products (sofas and tables)
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL DEFAULT '',
  base_price numeric(10,2) NOT NULL DEFAULT 0,
  category text NOT NULL DEFAULT 'sofa',
  in_stock boolean NOT NULL DEFAULT true,
  stock_quantity integer NOT NULL DEFAULT 0,
  featured boolean NOT NULL DEFAULT false,
  images jsonb NOT NULL DEFAULT '[]',
  wood_options jsonb NOT NULL DEFAULT '[]',
  color_options jsonb NOT NULL DEFAULT '[]',
  dimensions jsonb NOT NULL DEFAULT '{}',
  materials text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS products_category_idx ON products(category);
CREATE INDEX IF NOT EXISTS products_in_stock_idx ON products(in_stock);
CREATE INDEX IF NOT EXISTS products_featured_idx ON products(featured);

-- Sample products
INSERT INTO products (name, slug, description, base_price, category, in_stock, stock_quantity, featured, images, wood_options, color_options, dimensions, materials)
VALUES
(
  'Cacatúa',
  'Cacatúa',
  'Sofá de tres cuerpos fabricado artesanalmente con estructura de madera maciza de roble y tapizado premium. Cada pieza es única, pensada para perdurar generaciones. Sus líneas limpias y proporciones estudiadas lo convierten en el centro de cualquier living sofisticado.',
  850000,
  'sofa',
  true,
  2,
  true,
  '["https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg","https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg","https://images.pexels.com/photos/2986011/pexels-photo-2986011.jpeg"]',
  '[{"name":"Roble Natural","price_modifier":0},{"name":"Nogal Americano","price_modifier":45000},{"name":"Cedro Aromático","price_modifier":35000},{"name":"Teca Premium","price_modifier":80000}]',
  '[{"name":"Crema Marfil","hex":"#F5F0E8"},{"name":"Camel Terracota","hex":"#C4956A"},{"name":"Gris Piedra","hex":"#8B8680"},{"name":"Verde Salvia","hex":"#7D9B76"},{"name":"Azul Petróleo","hex":"#3D5A6B"}]',
  '{"width":220,"height":85,"depth":95,"unit":"cm"}',
  ARRAY['Roble macizo','Espuma HR 35','Tela jacquard importada','Patas torneadas']
),
(
  'Mesa Comedor Nórdica',
  'mesa-comedor-nordica',
  'Mesa de comedor con tapa en madera maciza y base de hierro artesanal. Diseño escandinavo que armoniza calidez natural con sobriedad industrial. Disponible en múltiples medidas y acabados. La tapa es trabajada a mano para resaltar la veta natural de la madera.',
  420000,
  'mesa',
  true,
  1,
  true,
  '["https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg","https://images.pexels.com/photos/2294967/pexels-photo-2294967.jpeg","https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg"]',
  '[{"name":"Pino Patagónico","price_modifier":0},{"name":"Algarrobo","price_modifier":55000},{"name":"Raulí","price_modifier":40000},{"name":"Lenga Fueguina","price_modifier":70000}]',
  '[{"name":"Natural Mate","hex":"#C8A882"},{"name":"Wengué Oscuro","hex":"#3B2314"},{"name":"Roble Claro","hex":"#D4A96A"},{"name":"Blanco Nórdico","hex":"#F0EDE8"}]',
  '{"width":180,"height":76,"depth":90,"unit":"cm"}',
  ARRAY['Algarrobo macizo','Base hierro forjado','Acabado en aceite de tung','Tornillería oculta']
),
(
  'Sofá Rinconero Palazzo',
  'sofa-rinconero-palazzo',
  'Rinconero modular de lujo con chaise longue. Estructura en madera de quebracho blanco, tapizado en cuero genuino o tela premium. Cada módulo es fabricado individualmente permitiendo adaptarlo a cualquier espacio. Profundidad generosa para el máximo confort.',
  1250000,
  'sofa',
  false,
  0,
  false,
  '["https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg","https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg"]',
  '[{"name":"Quebracho Blanco","price_modifier":0},{"name":"Nogal Negro","price_modifier":90000},{"name":"Roble Europeo","price_modifier":120000}]',
  '[{"name":"Cuero Natural","hex":"#A0785A"},{"name":"Cuero Negro","hex":"#1A1A1A"},{"name":"Lino Natural","hex":"#D9CBBA"},{"name":"Velvet Musgo","hex":"#5C7A5C"}]',
  '{"width":290,"height":88,"depth":160,"unit":"cm"}',
  ARRAY['Quebracho blanco','Cuero natural full grain','Espuma viscoelástica','Fibra siliconada']
),
(
  'Mesa Ratona Brutalista',
  'mesa-ratona-brutalista',
  'Mesa ratona de diseño contemporáneo con tapa en madera maciza flotante y estructura en hierro negro. Pieza de carácter fuerte que dialoga con cualquier estilo de decoración. El contraste entre la calidez de la madera y la frialdad del metal crea una tensión visual única.',
  185000,
  'mesa',
  true,
  3,
  false,
  '["https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg","https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg"]',
  '[{"name":"Pino Cepillado","price_modifier":0},{"name":"Algarrobo","price_modifier":25000},{"name":"Roble","price_modifier":35000}]',
  '[{"name":"Natural Veteado","hex":"#C8A882"},{"name":"Negro Carbón","hex":"#2C2C2C"},{"name":"Miel Oscuro","hex":"#8B6914"}]',
  '{"width":110,"height":42,"depth":60,"unit":"cm"}',
  ARRAY['Pino patagónico','Hierro forjado','Acabado en cera natural','Patas regulables']
),
(
  'Sofá Loveseat Artesanal',
  'sofa-loveseat-artesanal',
  'Sofá de dos cuerpos ideal para espacios íntimos. Estructura de madera de algarrobo con tapizado intercambiable. Diseño que equilibra tradición y modernidad, con costuras artesanales visibles como elemento decorativo. Butacas con reposabrazos tallados a mano.',
  520000,
  'sofa',
  true,
  1,
  false,
  '["https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg","https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg"]',
  '[{"name":"Algarrobo","price_modifier":0},{"name":"Raulí","price_modifier":30000},{"name":"Cedro","price_modifier":25000}]',
  '[{"name":"Mostaza Ocre","hex":"#D4A017"},{"name":"Terracota","hex":"#B85C38"},{"name":"Crudo Natural","hex":"#EDE0CC"},{"name":"Azul Índigo","hex":"#2E4057"}]',
  '{"width":145,"height":82,"depth":90,"unit":"cm"}',
  ARRAY['Algarrobo macizo','Tela lino importado','Relleno látex natural','Costuras decorativas']
),
(
  'Mesa Escritorio Ejecutivo',
  'mesa-escritorio-ejecutivo',
  'Escritorio de trabajo con tapa en madera maciza de 5 cm de espesor y estructura en acero. Diseñado para el profesional que valora tanto la estética como la funcionalidad. Pasacables integrado, cajones opcionales y acabados personalizables. La pieza perfecta para un home office de lujo.',
  380000,
  'mesa',
  true,
  2,
  false,
  '["https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg","https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg"]',
  '[{"name":"Roble Natural","price_modifier":0},{"name":"Nogal","price_modifier":60000},{"name":"Teca","price_modifier":95000}]',
  '[{"name":"Natural Satinado","hex":"#C9A96E"},{"name":"Wengué","hex":"#3B1F0E"},{"name":"Blanco Polar","hex":"#F5F5F0"}]',
  '{"width":160,"height":75,"depth":80,"unit":"cm"}',
  ARRAY['Roble macizo 5cm','Acero pintado polvo','Pasacables cromado','Patas regulables']
)
ON CONFLICT (slug) DO NOTHING;
