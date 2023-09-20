-- migrate:up

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL UNIQUE,
    price INT NOT NULL,
    tr_box INT NULL,
    category_id INT NOT NULL,
    discount_id INT NULL,
    origin_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE,
    FOREIGN KEY (discount_id) REFERENCES discounts (id),
    FOREIGN KEY (origin_id) REFERENCES origins (id) ON DELETE CASCADE
);
-- migrate:down

DROP TABLE products;