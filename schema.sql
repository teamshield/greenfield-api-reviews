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

CREATE INDEX ON characteristics (product_id);
CREATE INDEX ON reviews (product_id);
CREATE INDEX ON characteristic_reviews (review_id);
CREATE INDEX ON reviews_photos (review_id);



-- create temporary table temp_reviews as
-- select id, product_id, -- all columns but photos
--   array(
-- SELECT rp.url
-- FROM reviews_photos rp
-- WHERE rp.id = reviews.id
-- ) as photos
--     from reviews;


-- insert into reviews
--   (id, product_id, photos)
-- select id, product_id, photo
-- from temp_reviews;


COPY characteristics FROM '/Users/kevypark/Desktop/hrnyc23/Team Shield/greenfield-api-reviews/seed-data/characteristics.csv' DELIMITERS ',' CSV header;
COPY reviews FROM '/Users/kevypark/Desktop/hrnyc23/Team Shield/greenfield-api-reviews/seed-data/reviews.csv' DELIMITERS ',' CSV header;
COPY characteristic_reviews FROM '/Users/kevypark/Desktop/hrnyc23/Team Shield/greenfield-api-reviews/seed-data/characteristic_reviews.csv' DELIMITERS ',' CSV header;
COPY reviews_photos FROM '/Users/kevypark/Desktop/hrnyc23/Team Shield/greenfield-api-reviews/seed-data/reviews_photos.csv' DELIMITERS ',' CSV header;

-- psql postgres -U kevypark -a -f schema.sql