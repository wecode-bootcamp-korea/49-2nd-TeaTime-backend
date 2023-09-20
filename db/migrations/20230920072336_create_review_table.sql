-- migrate:up

CREATE TABLE reviews (
    id INT NOT NULL AUTO_INCREMENT,
    image_url VARCHAR(1000) NOT NULL UNIQUE,
    content VARCHAR(1500) NOT NULL,
    grade DECIMAL(2,1) NOT NULL,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);
-- migrate:down

DROP TABLE reviews;