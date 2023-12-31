-- migrate:up
ALTER TABLE reviews MODIFY image_url VARCHAR(700) NULL UNIQUE;
ALTER TABLE reviews MODIFY grade TINYINT NOT NULL;
DROP INDEX image_url ON reviews;


-- migrate:down
ALTER TABLE reviews MODIFY image_url VARCHAR(1000) NOT NULL UNIQUE;
ALTER TABLE reviews MODIFY grade DECIMAL(2,1) NOT NULL;
CREATE UNIQUE INDEX image_url ON reviews(image_url);

