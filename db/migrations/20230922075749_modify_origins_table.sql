-- migrate:up
ALTER TABLE origins CHANGE country region VARCHAR(100);

-- migrate:down
ALTER TABLE origins CHANGE region country VARCHAR(20);
