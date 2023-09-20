-- migrate:up

CREATE TABLE order_addresses (
    id INT NOT NULL AUTO_INCREMENT,
    address VARCHAR(100) NOT NULL,
    detail_address VARCHAR(100) NOT NULL,
    zip_code VARCHAR(6) NOT NULL,
    order_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE
);
-- migrate:down

DROP TABLE order_addresses;