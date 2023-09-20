-- migrate:up

CREATE TABLE origins (
    id INT NOT NULL AUTO_INCREMENT,
    country VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);
-- migrate:down

DROP TABLE origins;