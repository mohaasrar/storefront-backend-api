CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price INTEGER NOT NULL,
  category VARCHAR(50) NOT NULL,
   CONSTRAINT prodname_uniqe UNIQUE (name)
);