SET FOREIGN_KEY_CHECKS=0;

-- inserts for apparel
INSERT INTO products (name, description, image_url, price, stock, categoryId, createdAt, updatedAt) VALUES
('Nike T-Shirt (Blue)', 'this items description... blah, blah, blah', 'default.jpg', 19.99, 41, 1, '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('Nike T-Shirt (Red)', 'this items description... blah, blah, blah', 'default.jpg', 19.99, 56, 1, '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('Levi Jeans', 'this items description... blah, blah, blah', 'default.jpg', 29.99, 34, 1, '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('Columbia Convertible Pants', 'this items description... blah, blah, blah', 'default.jpg', 49.97, 19, 1, '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('Paisley Socks', 'this items description... blah, blah, blah', 'default.jpg', 5.99, 19, 1, '2019-05-08 21:09:01', '2019-05-08 21:09:01');

-- inserts for electronics
INSERT INTO products (name, description, image_url, price, stock, categoryId, createdAt, updatedAt) VALUES
('Surround Sound Receiver', 'this items description... blah, blah, blah', 'default.jpg', 369.99, 13, 2, '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('42-inch TV', 'this items description... blah, blah, blah', 'default.jpg', 269.99, 22, 2, '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('10-inch Powered Sub-Woofer', 'this items description... blah, blah, blah', 'default.jpg', 142.99, 41, 2, '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('BluRay Player', 'this items description... blah, blah, blah', 'default.jpg', 99.99, 54, 2, '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('Digital Camera', 'this items description... blah, blah, blah', 'default.jpg', 284.99, 27, 2, '2019-05-08 21:09:01', '2019-05-08 21:09:01');

-- inserts for food
INSERT INTO products (name, description, image_url, price, stock, categoryId, createdAt, updatedAt) VALUES
('Almonds (12oz)', 'this items description... blah, blah, blah', 'default.jpg', 5.69, 65, 3, '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('Coconut Water', 'this items description... blah, blah, blah', 'default.jpg', 1.99, 212, 3, '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('Lentil Soup', 'this items description... blah, blah, blah', 'default.jpg', 1.99, 123, 3, '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('Garbanzo Beans', 'this items description... blah, blah, blah', 'default.jpg', 1.29, 156, 3, '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('Brown Rice Pasta', 'this items description... blah, blah, blah', 'default.jpg', 2.49, 178, 3, '2019-05-08 21:09:01', '2019-05-08 21:09:01');

-- inserts for computer
INSERT INTO products (name, description, image_url, price, stock, categoryId, createdAt, updatedAt) VALUES
('27-inch Monitor', 'this items description... blah, blah, blah', 'default.jpg', 199.99, 12, 4, '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('600 watt Power Supply', 'this items description... blah, blah, blah', 'default.jpg', 99.99, 45, 4, '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('250GB SSD', 'this items description... blah, blah, blah', 'default.jpg', 79.99, 158, 4, '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('3TB Hard Drive', 'this items description... blah, blah, blah', 'default.jpg', 99.99, 17, 4, '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('8GB (2 x 4GB) DDR4 Memory', 'this items description... blah, blah, blah', 'default.jpg', 59.99, 66, 4, '2019-05-08 21:09:01', '2019-05-08 21:09:01');

-- inserts for toiletries
INSERT INTO products (name, description, image_url, price, stock, categoryId, createdAt, updatedAt) VALUES
('Toilet Paper', 'this items description... blah, blah, blah', 'default.jpg', 1.99, 85, 5, '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('Shampoo', 'this items description... blah, blah, blah', 'default.jpg', 3.99, 67, 5, '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('Conditioner', 'this items description... blah, blah, blah', 'default.jpg', 4.99, 48, 5, '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('Bar Soap', 'this items description... blah, blah, blah', 'default.jpg', 0.59, 243, 5, '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('Toothpaste', 'this items description... blah, blah, blah', 'default.jpg', 1.99, 112, 5, '2019-05-08 21:09:01', '2019-05-08 21:09:01');

-- inserts for categories
INSERT INTO categories (name, description) VALUES
('Apparel', 'blah, blah, blah about apparel'),
('Electronics', 'blah, blah, blah about electronics'),
('Food', 'blah, blah, blah about food'),
('Computer', 'blah, blah, blah about computers'),
('Toiletries', 'blah, blah, blah about toiletries');

-- inserts for users
INSERT INTO users (username, password, email, full_name, address, city, state, zip_code, createdAt, updatedAt) VALUES
('mike', '$2b$10$6ovU8giiTYBSIVMc7GLy5evwtzAZcaWpxLamt7BNotH.JUdZ7btnC', 'test@test.com', 'My Name', '123 Main St', 'Cleveland', 'OH', '44124', '2019-05-08 21:09:01', '2019-05-08 21:09:01');

-- inserts for cart_items
INSERT INTO cart_items (num, each_price, userId, productId) VALUES
(1, 1.99, 1, 13),
(1, 99.99, 1, 17),
(4, 99.99, 1, 9);

SET FOREIGN_KEY_CHECKS=1;