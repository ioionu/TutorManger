-- install.sql
CREATE TABLE payments (
  id serial primary key,
  description varchar(256) NOT NULL,
  gateway_id varchar(128),
  amount numeric NOT NULL,
  userid integer NOT NULL
);

CREATE TABLE users (
  id serial primary key,
  email varchar(128) NOT NULL UNIQUE,
  name varchar(128) NOT NULL
);

CREATE TABLE lessons (
  id serial primary key,
  lesson_date timestamptz NOT NULL,
  tutor integer NOT NULL,
  student integer NOT NULL
);
