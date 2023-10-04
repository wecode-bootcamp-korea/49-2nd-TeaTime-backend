-- migrate:up

CREATE TABLE carts (
    id INT NOT NULL AUTO_INCREMENT,
    count INT NOT NULL,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);

ALTER TABLE carts
    ADD COLUMN isbag ENUM('Y', 'N') DEFAULT 'N' NOT NULL,
    ADD COLUMN ispackage ENUM('Y', 'N') DEFAULT 'N' NOT NULL;
-- migrate:down

DROP TABLE carts;