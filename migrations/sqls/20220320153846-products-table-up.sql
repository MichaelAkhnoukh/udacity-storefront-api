CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NUll,
  price integer NOT NULL,
  category VARCHAR(64)
);