-- migrate:up

CREATE TABLE categories (
    id INT NOT NULL AUTO_INCREMENT,
    type VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);
-- migrate:down

DROP TABLE categories;