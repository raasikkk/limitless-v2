CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  avatar TEXT NOT NULL,
  password TEXT NOT NULL,
  bio TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  cover TEXT
)

CREATE TABLE competitions (
  id SERIAL PRIMARY KEY,
  user_id INT,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  cover TEXT NOT NULL,
  category_id INT,
  private BOOLEAN DEFAULT FALSE,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
)

CREATE TABLE followers (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  follower_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE (user_id, follower_id),
  CHECK (user_id <> follower_id)
);