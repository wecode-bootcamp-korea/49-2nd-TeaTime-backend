-- migrate:up
ALTER TABLE users MODIFY is_delete TINYINT NOT NULL DEFAULT 0;

-- migrate:down
 ALTER TABLE users MODIFY is_delete TINYINT NOT NULL;
