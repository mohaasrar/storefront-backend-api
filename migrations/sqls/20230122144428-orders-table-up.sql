CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR(20) NOT NULL,
  user_id bigint NOT NULL REFERENCES users(id)  ON DELETE CASCADE
);