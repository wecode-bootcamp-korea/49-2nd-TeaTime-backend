-- migrate:up
ALTER TABLE products ADD information varchar(700) NOT NULL;

-- migrate:down
ALTER TABLE products DROP information;