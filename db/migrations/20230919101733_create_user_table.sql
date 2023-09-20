-- migrate:up

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    login_id VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    phone_number VARCHAR(13) NOT NULL,
    point INT NULL,
    is_agree TINYINT NOT NULL,
    is_delete TINYINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- migrate:down

DROP TABLE users;