-- install.sql
DROP SCHEMA public cascade;
CREATE SCHEMA public;
CREATE TABLE payments (
  id serial primary key,
  description varchar(256),
  amount numeric NOT NULL,
  userid integer,
  lessonid integer NOT NULL,
  status varchar(128)
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

CREATE TABLE transactions (
  id serial primary key,
  payment_id integer NOT NULL,
  amount varchar(128) NOT NULL,
  code varchar(128) NOT NULL,
  message varchar(256) NOT NULL
);

INSERT INTO users (email, name, password) VALUES ('student@localhost', 'Test Student', 'password');
INSERT INTO users (email, name, password) VALUES ('student2@localhost', 'Test2 Student2', 'password');
INSERT INTO users (email, name, password) VALUES ('teacher@localhost', 'Test Teacher', 'password');

INSERT INTO lessons (lesson_date, tutor, student) VALUES ('1999-01-01', 3, 1);
INSERT INTO lessons (lesson_date, tutor, student) VALUES ('1999-02-01', 3, 1);
INSERT INTO lessons (lesson_date, tutor, student) VALUES ('2015-02-01', 3, 2);

INSERT INTO payments (description, amount, userid, lessonid, status)
  VALUES ('test payment', 20, 1, 1, 'paid');
INSERT INTO payments (description, amount, userid, lessonid, status)
  VALUES ('test payment 2', 10, 1, 2, 'unpaid');
INSERT INTO payments (description, amount, userid, lessonid, status)
  VALUES ('test payment 3', 30, 2, 3, 'unpaid');
