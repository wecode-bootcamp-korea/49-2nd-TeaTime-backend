-- migrate:up

CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT,
    payments VARCHAR(30) NOT NULL,
    address VARCHAR(100) NOT NULL,
    detail_address VARCHAR(100) NOT NULL,
    zip_code VARCHAR(6) NOT NULL,
    total_fee INT NOT NULL,
    is_shipping_fee TINYINT NOT NULL,
    is_agree TINYINT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
-- migrate:down

DROP TABLE orders;