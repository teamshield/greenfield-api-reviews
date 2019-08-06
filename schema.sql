DROP DATABASE IF EXISTS greenfield;

CREATE DATABASE greenfield;

\c greenfield;

CREATE TABLE characteristics
(
  id INTEGER,
  product_id INTEGER,
  name VARCHAR(10)
);
CREATE TABLE reviews
(
  id INTEGER,
  product_id INTEGER,
  rating INTEGER,
  date DATE,
  summary VARCHAR(150),
  body VARCHAR(600),
  recommend BOOL,
  reported BOOL,
  reviewer_name VARCHAR(30),
  reviewer_email VARCHAR(40),
  response VARCHAR(150),
  helpfulness INTEGER
);
CREATE TABLE characteristic_reviews
(
  id INTEGER,
  characteristic_id INTEGER,
  review_id INTEGER,
  value INTEGER
);

CREATE TABLE reviews_photos
(
  id INTEGER,
  review_id INTEGER,
  url VARCHAR(400)
);


COPY characteristics FROM '/Users/kevypark/Desktop/hrnyc23/Team Shield/greenfield-api-reviews/seed-data/characteristics.csv' DELIMITERS ',' CSV header;
COPY characteristic_reviews FROM '/Users/kevypark/Desktop/hrnyc23/Team Shield/greenfield-api-reviews/seed-data/characteristic_reviews.csv' DELIMITERS ',' CSV header;
COPY reviews_photos FROM '/Users/kevypark/Desktop/hrnyc23/Team Shield/greenfield-api-reviews/seed-data/reviews_photos.csv' DELIMITERS ',' CSV header;
COPY reviews FROM '/Users/kevypark/Desktop/hrnyc23/Team Shield/greenfield-api-reviews/seed-data/reviews.csv' DELIMITERS ',' CSV header;

CREATE INDEX ON characteristics
(product_id);
CREATE INDEX ON characteristics
(id);
CREATE INDEX ON reviews
(product_id);
CREATE INDEX ON reviews
(id);
CREATE INDEX ON characteristic_reviews
(id);
CREATE INDEX ON characteristic_reviews
(review_id);
CREATE INDEX ON characteristic_reviews
(characteristic_id);
CREATE INDEX ON reviews_photos
(id);
CREATE INDEX ON reviews_photos
(review_id);


ALTER TABLE reviews
ADD COLUMN photos TEXT[];


UPDATE reviews SET photos = array(
SELECT reviews_photos.url
FROM reviews_photos
WHERE reviews_photos.review_id = reviews.id
) WHERE reviews.id > 0 AND reviews.id < 100;




ALTER TABLE reviews
ADD COLUMN characteristics_value INTEGER[];


UPDATE reviews SET characteristics_value = array(
SELECT characteristic_reviews.value
FROM characteristic_reviews
WHERE characteristic_reviews.review_id = reviews.id
) WHERE reviews.id > 0 AND reviews.id < 100;



ALTER TABLE reviews
ADD COLUMN characteristics_name CHARACTER VARYING;

UPDATE reviews SET characteristics_name = (
SELECT array_agg(characteristics.name)
FROM characteristics
WHERE characteristics.product_id = reviews.product_id
) WHERE reviews.id > 0 AND reviews.id < 100;


ALTER TABLE reviews
ADD COLUMN characteristics_id INTEGER[];

UPDATE reviews SET characteristics_id = (
SELECT array_agg(characteristics.id)
FROM characteristics
WHERE characteristics.product_id = reviews.product_id
) WHERE reviews.id > 0 AND reviews.id < 100;




-- 5777922


-- psql postgres -U kevypark -a -f schema.sql