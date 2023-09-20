-- migrate:up

CREATE TABLE delivery_addresses (
    id INT NOT NULL AUTO_INCREMENT,
    address VARCHAR(100) NOT NULL,
    detail_address VARCHAR(100) NOT NULL,
    zip_code VARCHAR(6) NOT NULL,
    name VARCHAR(50) NOT NULL,
    is_main TINYINT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
-- migrate:down

DROP TABLE delivery_addresses;