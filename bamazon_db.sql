DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30),
    price DECIMAL(30, 2) NOT NULL,
    stock_quantity INT NOT NULL
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3123, "Rubik's Cube", "Toys R Us", 7.99, 50),
	(9287, "Blender", "Wal Mart", 24.99, 48),
    (5874, "Pencil Case", "Staples", 8.99, 59),
    (1903, "Assorted Candies", "Target", 19.99, 73),
    (8970, "Super Soaker", "Toys R Us", 12.99, 34),
    (4528, "Notebook", "Office Depot", 5.99, 95),
    (5237, "Thermos", "Brookstone", 18.99, 120),
    (4791, "Pack of Socks", "Costco", 12.00, 180),
    (5678, "Cell Phone Charger", "Best Buy", 12.99, 200),
    (4091, "Backpack", "Eddie Bauer", 29.99, 60);
