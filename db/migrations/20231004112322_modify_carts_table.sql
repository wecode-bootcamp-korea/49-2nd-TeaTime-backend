-- migrate:up

ALTER TABLE carts ADD is_bag TINYINT NOT NULL;
ALTER TABLE carts ADD is_packing TINYINT NOT NULL;
-- migrate:down

ALTER TABLE carts DROP COLUMN is_bag;
ALTER TABLE carts DROP COLUMN is_packing;