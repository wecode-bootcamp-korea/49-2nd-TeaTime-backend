-- migrate:up
ALTER TABLE orders ADD name VARCHAR(30) NOT NULL;
ALTER TABLE orders ADD phone_number VARCHAR(13) NOT NULL;
ALTER TABLE orders ADD email VARCHAR(255) NOT NULL;
ALTER TABLE orders DROP address;
ALTER TABLE orders DROP detail_address;
ALTER TABLE orders DROP zip_code;

-- migrate:down

ALTER TABLE orders DROP COLUMN name;
ALTER TABLE orders DROP COLUMN phone_number;
ALTER TABLE orders DROP COLUMN email;
ALTER TABLE orders ADD address VARCHAR(100) NOT NULL;
ALTER TABLE orders ADD detail_address VARCHAR(100) NOT NULL;
ALTER TABLE orders ADD zip_code VARCHAR(6) NOT NULL;