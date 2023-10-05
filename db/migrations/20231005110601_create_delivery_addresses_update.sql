-- migrate:up
ALTER TABLE delivery_addresses ADD phone_number VARCHAR(13) NOT NULL;
ALTER TABLE delivery_addresses ADD serve_name VARCHAR(50) NOT NULL;
ALTER TABLE delivery_addresses change serve_name sub_name VARCHAR(50) NOT NULL;

-- migrate:down

