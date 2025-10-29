CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,  
    description TEXT
    parent_id INT,
    CONSTRAINT fk_parent_category
        FOREIGN KEY (parent_id)
        REFERENCES category(category_id)
        ON DELETE SET NULL
);


DROP TABLE IF EXISTS product CASCADE;

CREATE TABLE product (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    inventory INT NOT NULL,
    prod_image_url TEXT,
);


CREATE TABLE product_category (
    product_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (product_id, category_id),
    CONSTRAINT fk_pc_product FOREIGN KEY (product_id)
        REFERENCES product(product_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_pc_category FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);


CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    review_text TEXT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_customer_id INT REFERENCES customer(customer_id) ON DELETE SET NULL,
    fk_product_id INT REFERENCES product(product_id) ON DELETE CASCADE,
    fk_category_id INT REFERENCES category(category_id) ON DELETE SET NULL
);




INSERT INTO category (name, description)
VALUES 
('Jewelry', 'All jewelry products'),
('Necklaces', 'Various styles of necklaces'),
('Bracelets', 'Bracelets and bangles');  


UPDATE category
SET parent_id = (SELECT category_id FROM category WHERE name = 'Jewelry')
WHERE name = 'Necklaces';



INSERT INTO product (product_name, description, price, inventory, prod_image_url)
VALUES 
('Whimsical Sun Auburn Beaded Necklace', 'Handcrafted bronze beaded necklace', 17.00, 20, 'necklace1.jpg'),
('Dragonfly Pendant Necklace', 'Elegant dragonfly motif necklace', 19.99, 15, 'necklace2.jpg');

INSERT INTO product_category (product_id, category_id)
SELECT p.product_id, c.category_id
FROM product p, category c
WHERE p.product_name LIKE '%Necklace%' AND c.name = 'Necklaces';


INSERT INTO customer (first_name, last_name, email, password)
VALUES ('John', 'Doe', 'john@gmail.com', 'hashed_password');


INSERT INTO reviews (review_text, rating, fk_customer_id, fk_product_id, fk_category_id)
VALUES
('Beautiful design and quality!', 5, 1, 1, 2),
('Nice color, but chain feels light.', 4, 1, 2, 2);

