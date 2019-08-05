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
COPY reviews FROM '/Users/kevypark/Desktop/hrnyc23/Team Shield/greenfield-api-reviews/seed-data/reviews.csv' DELIMITERS ',' CSV header;
COPY characteristic_reviews FROM '/Users/kevypark/Desktop/hrnyc23/Team Shield/greenfield-api-reviews/seed-data/characteristic_reviews.csv' DELIMITERS ',' CSV header;
COPY reviews_photos FROM '/Users/kevypark/Desktop/hrnyc23/Team Shield/greenfield-api-reviews/seed-data/reviews_photos.csv' DELIMITERS ',' CSV header;

-- psql postgres -U kevypark -a -f schema.sql