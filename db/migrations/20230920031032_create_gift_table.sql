-- migrate:up

CREATE TABLE gifts (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    phone_number VARCHAR(13) NOT NULL,
    content VARCHAR(300) NOT NULL,
    order_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE
);
-- migrate:down

DROP TABLE gifts;