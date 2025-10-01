CREATE TABLE public.category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,  
    description TEXT
);


DROP TABLE IF EXISTS public.product CASCADE;

CREATE TABLE public.product (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    inventory INT NOT NULL,
    prod_image_url TEXT,
    fk_category_id INT REFERENCES public.category(category_id)  
);


INSERT INTO public.category (name, description)
VALUES 
  ('Jewelry', 'Necklaces, rings, bracelets, and more'),
  ('Clothing', 'Apparel including shirts, dresses, and pants'),
  ('Accessories', 'Fashion extras like scarves, belts, and hats'),
  ('Home Decor', 'Decorative items for home and living');


INSERT INTO public.product (product_name, description, price, inventory, prod_image_url, fk_category_id)
VALUES 
  ('Whimsical Sun Auburn Beaded Necklace in Bronze', 'Handmade beaded necklace with sun motif', 17.00, 25, 'item1.jpg', 1),
  ('Whimsical Dragonfly Auburn Necklace in Bronze', 'Elegant dragonfly design', 19.99, 15, 'item2.jpg', 1),
  ('Cotton Summer Dress', 'Lightweight cotton dress for summer', 39.99, 10, 'dress.jpg', 2),
  ('Leather Belt', 'Brown genuine leather belt', 24.99, 30, 'belt.jpg', 3),
  ('Decorative Candle Holder', 'Metal candle holder with floral design', 14.99, 20, 'candleholder.jpg', 4);


SELECT p.product_name, p.price, c.name AS category
FROM public.product p
JOIN public.category c ON p.fk_category_id = c.category_id
ORDER BY c.name, p.product_name;