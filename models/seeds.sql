SET FOREIGN_KEY_CHECKS=0;

-- inserts for products
INSERT INTO products (name, description, image_name, price, stock, categoryId, createdAt, updatedAt) VALUES
('$10 bamazon Gift Card', 'Use bamazon Gift Cards to shop at our sister site.', 'bamazon.png', '10.00', '119', '2', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$25 bamazon Gift Card', 'Use bamazon Gift Cards to shop at our sister site.', 'bamazon.png', '25.00', '75', '2', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$50 bamazon Gift Card', 'Use bamazon Gift Cards to shop at our sister site.', 'bamazon.png', '50.00', '155', '2', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$75 bamazon Gift Card', 'Use bamazon Gift Cards to shop at our sister site.', 'bamazon.png', '75.00', '32', '2', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$100 bamazon Gift Card', 'Use bamazon Gift Cards to shop at our sister site.', 'bamazon.png', '100.00', '63', '2', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$10 eBook Cash', 'eBook cash can be used at our eBooks sister site.', 'ebooks.png', '10.00', '76', '1', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$25 eBook Cash', 'eBook cash can be used at our eBooks sister site.', 'ebooks.png', '25.00', '92', '1', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$50 eBook Cash', 'eBook cash can be used at our eBooks sister site.', 'ebooks.png', '50.00', '43', '1', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$75 eBook Cash', 'eBook cash can be used at our eBooks sister site.', 'ebooks.png', '75.00', '16', '1', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$100 eBook Cash', 'eBook cash can be used at our eBooks sister site.', 'ebooks.png', '100.00', '11', '1', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$10 eGame Cash', 'eGame cash can be used at our eBooks sister site.', 'egames.png', '10.00', '41', '3', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$25 eGame Cash', 'eGame cash can be used at our eBooks sister site.', 'egames.png', '25.00', '21', '3', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$50 eGame Cash', 'eGame cash can be used at our eBooks sister site.', 'egames.png', '50.00', '18', '3', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$75 eGame Cash', 'eGame cash can be used at our eBooks sister site.', 'egames.png', '75.00', '3', '3', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$100 eGame Cash', 'eGame cash can be used at our eBooks sister site.', 'egames.png', '100.00', '4', '3', '2019-05-08 21:09:01', '2019-05-08 21:09:01');

-- inserts for categories
INSERT INTO categories (name, description, image_name) VALUES
('eBooks', 'Shop at eBooks!', 'ebooks.png'),
('bamazon Cards', 'Shop at bamazon!', 'bamazon.png'),
('eGames', 'Shop at eGames!', 'egames.png');

-- inserts for users
INSERT INTO users (username, password, email, full_name, address, city, state, zip_code, createdAt, updatedAt) VALUES
('mike', '$2b$10$6ovU8giiTYBSIVMc7GLy5evwtzAZcaWpxLamt7BNotH.JUdZ7btnC', 'test@test.com', 'My Name', '123 Main St', 'Cleveland', 'OH', '44124', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('jdoe', '$2b$10$A3DkmZhJI/ZRSHyBQLc4U.IDiGtuPYPZo8Ffcg4Gs9C290H5Lskya', 'johndoe@gmail.com', 'John Doe', '2345 N High St', 'Sometown', 'MS', '223344', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('janedoe', '$2b$10$dFcPPJQ6iijpdaHH475xqOoYJq3Q7YY3itx.Hotly.XL9y3URc1m6', 'janedoe@gmail.com', 'Jane Doe', '2345 N High St', 'Sometown', 'MS', '223344', '2019-05-08 21:09:01', '2019-05-08 21:09:01');

-- inserts for cart_items
INSERT INTO cart_items (num, each_price, userId, productId) VALUES
('1', '25.00', '1', '13'),
('1', '50.00', '1', '12'),
('4', '10.00', '1', '6'),
('3', '10.00', '2', '1'),
('2', '100.00', '2', '5'),
('1', '75.00', '2', '14'),
('2', '25.00', '2', '13');

SET FOREIGN_KEY_CHECKS=1;