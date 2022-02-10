DROP DATABASE IF EXISTS chirons_system;

CREATE DATABASE chirons_system;

\c chirons_system;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE trainers(
trainer_id uuid DEFAULT uuid_generate_v4(),
trainer_handle VARCHAR(35) NOT NULL,
trainer_email VARCHAR(50) NOT NULL UNIQUE,
trainer_password VARCHAR(255) NOT NULL,
PRIMARY KEY (trainer_id)
);

CREATE TABLE clients(
  client_id SERIAL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  -- blog_body TEXT NOT NULL,
  trainer_id UUID,
  created_at DATE DEFAULT CURRENT_DATE,
  PRIMARY KEY (client_id),
  FOREIGN KEY (trainer_id) REFERENCES trainers(trainer_id)
);

CREATE TABLE exercises(
  exercise_id SERIAL,
  name VARCHAR(255) NOT NULL,
  best NUMERIC,
  client_id SERIAL,
  trainer_id UUID,
  PRIMARY KEY (exercise_id),
  FOREIGN KEY (trainer_id) REFERENCES trainers(trainer_id),
  FOREIGN KEY (client_id) REFERENCES clients(client_id)
);

INSERT INTO trainers (trainer_handle, trainer_email, trainer_password) VALUES ('el_capitan', 'el_capitan@gmail.com', 'elcapitan123');

INSERT INTO clients (first_name, last_name) VALUES ('stephen', 'engblom');

INSERT INTO exercises (name, best) VALUES ('squat', '195.5');

-- INSERT INTO clients (first_name, blog_body, trainer_id,)
-- SELECT * FROM trainers;