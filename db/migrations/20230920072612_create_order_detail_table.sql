-- migrate:up

CREATE TABLE order_details (
    id INT NOT NULL AUTO_INCREMENT,
    count INT NOT NULL,
    status VARCHAR(30) NOT NULL UNIQUE,
    is_bag TINYINT NOT NULL,
    is_packing TINYINT NOT NULL,
    product_id INT NOT NULL,
    order_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE
);
-- migrate:down

DROP TABLE order_details;