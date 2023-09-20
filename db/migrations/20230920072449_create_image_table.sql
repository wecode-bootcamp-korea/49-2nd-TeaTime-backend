-- migrate:up

CREATE TABLE images (
    id INT NOT NULL AUTO_INCREMENT,
    image_url VARCHAR(1000) NOT NULL,
    sort INT NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);
-- migrate:down

DROP TABLE images;