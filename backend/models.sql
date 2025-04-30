CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  avatar TEXT NOT NULL,
  password TEXT NOT NULL,
  bio TEXT,
  college INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  google_id TEXT UNIQUE,
  FOREIGN KEY (college) REFERENCES colleges(id)
)

CREATE TABLE colleges (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  logo TEXT
)

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  cover TEXT
)

CREATE TABLE competitions (
  id SERIAL PRIMARY KEY,
  user_id INT,
  winner_id INT,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  rules TEXT,
  cover TEXT,
  category INTEGER,
  private BOOLEAN DEFAULT FALSE NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category) REFERENCES categories(id) ON DELETE SET NULL,
  FOREIGN KEY (winner_id) REFERENCES users(id)
)

CREATE TABLE participants (
  id SERIAL PRIMARY KEY,
  competition_id INT,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (competition_id) REFERENCES competitions(id),
  UNIQUE (competition_id, user_id)
)

CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  participant_id INT,
  competition_id INT,
  submited_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  explanation TEXT,
  image TEXT,
  file TEXT,
  score INT NOT NULL DEFAULT 0,
  FOREIGN KEY (participant_id) REFERENCES users(id),
  FOREIGN KEY (competition_id) REFERENCES competitions(id)
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

CREATE TABLE votes (
  id SERIAL PRIMARY KEY,
  user_id INT,
  submission_id INT,
  vote_type BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  comment VARCHAR(200),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (submission_id) REFERENCES submissions(id)
)

CREATE TABLE chats (
  id SERIAL PRIMARY KEY,
  user_id INT,
  supervisor_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (supervisor_id) REFERENCES users(id),
  UNIQUE (user_id, supervisor_id)
)

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  user_id INT,
  chat_id INT,
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (chat_id) REFERENCES chats(id)
)