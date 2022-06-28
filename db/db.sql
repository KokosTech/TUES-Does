/* POSGRESS SQL DATABASE */

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(28) NOT NULL UNIQUE,
  passhash VARCHAR NOT NULL,
  salt VARCHAR NOT NULL
);

CREATE TABLE lists (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(28) NOT NULL,
  icon VARCHAR(18),
  color VARCHAR(6)
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  list_id INTEGER NOT NULL REFERENCES lists(id) ON DELETE CASCADE,
  name VARCHAR(28) NOT NULL,
  description VARCHAR(255),
  priority INTEGER NOT NULL,
  due_date DATE,
  flagged BOOLEAN NOT NULL DEFAULT false,
  completed BOOLEAN NOT NULL DEFAULT false
);

INSERT INTO users(username, passhash) values($1, $2);


INSERT INTO lists(owner_id, name, icon, color) values($1, $2, $3, $4);
INSERT INTO tasks(list_id, name, description, priority, due_date, flagged, completed) values($1, $2, $3, $4, $5, $6, $7);
