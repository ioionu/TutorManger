-- install.sql
DROP SCHEMA public cascade;
CREATE SCHEMA public;
CREATE TABLE payments (
  id serial primary key,
  description varchar(256) NOT NULL,
  gateway_id varchar(128),
  amount numeric NOT NULL,
  userid integer NOT NULL,
  lessonid integer NOT NULL
);

CREATE TABLE users (
  id serial primary key,
  email varchar(128) NOT NULL UNIQUE,
  name varchar(128) NOT NULL,
  password varchar(128) NOT NULL
);

CREATE TABLE lessons (
  id serial primary key,
  lesson_date timestamptz NOT NULL,
  tutor integer NOT NULL,
  student integer NOT NULL
);

INSERT INTO users (email, name, password) VALUES ('student@localhost', 'Test Student', 'password');
INSERT INTO users (email, name, password) VALUES ('teacher@localhost', 'Test Teacher', 'password');

INSERT INTO lessons (lesson_date, tutor, student) VALUES ('1999/01/01', 1, 0);

INSERT INTO payments (description, gateway_id, amount, userid, lessonid)
  VALUES ('test payment', '123', 20, 1, 1);
