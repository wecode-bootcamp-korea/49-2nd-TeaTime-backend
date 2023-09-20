-- migrate:up

CREATE TABLE discounts (
    id INT NOT NULL AUTO_INCREMENT,
    rate INT NOT NULL,
    PRIMARY KEY (id)
);
-- migrate:down

DROP TABLE discounts;