-- install.sql
CREATE TABLE payment (
  id serial primary key,
  description varchar(256) NOT NULL,
  gateway_id varchar(128),
  amount numeric NOT NULL,
  user integer NOT NULL
);

CREATE TABLE user (
  id serial primary key,
  email varchar(128) NOT NULL UNIQUE,
  name varchar(128) NOT NULL
);

CREATE TABLE lesson (
  id serial primary kay,
  timestamptz NOT NULL,
  tutor integer NOT NULL,
  student integer NOT NULL
);
