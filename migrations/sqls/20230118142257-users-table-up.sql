CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  password VARCHAR NOT NULL,
  CONSTRAINT username_uniqe UNIQUE (username)
);