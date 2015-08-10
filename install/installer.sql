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
  password varchar(1024) NOT NULL,
  salt varchar(256) NOT NULL
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

-- password = password
INSERT INTO users (email, name, password, salt) VALUES ('student@localhost', 'Test Student',
  'xeR41ZKIyEGqUw22hFxMjZYok6ABzk4RpJY4c6qYE0r3rZjBtFjOP9dMo1vro82nuNEDjWqHBxuRj4N0BfP+dyj/5/CXb8Nd2C/A5eRs6c4mp4iyx9GD+lv42WB+7NcdAbTxGa8RtXgqLrTfD97OoJI8ABKpcXPOeUab0Jzi2J9jYCF5lnVuj7QsM1SmxYQfgseYSCCKzsv+DtSC0lVY2Ry6bCPXsZhSyeK5BZ060CHw3v7r62XT8mkNQ2i/M+TEFCJcYeGzOTKEjnAmr7lNfm069TpiLPwTUT5R5DGrnLH661vpD/Rma+qpdKpH+SAf1uIxF3GBnV6gFXElGfSNG1abYoud5xK36bdei+zHfMZ10Ncz9nYn6hzoTE03YgXpVtmmaAa7eg8YMTKHRxo43ONwJ5xPQkLNpWgwmLCGM0NrNDJeTvMNJstYPMiLUR5RFpgGhm/zphepxmoTOE6AH5kUu66rzNCFimUtY4vCL44jnSfkqDkm0MprUW2Q4Euhx3BzmXZkFEkm3ruhdxAy2qy/rENnb9b5BOrcVKn8nL+XCvbmyZJkTQynhdRcRA7zm6RVf0NRI9UDci08LlSLmFSKhi3qhSgCLJ4HDUSCApjpvLj60Pkdg5KfruvDEWwCzWD2a+r3hDVoGsbhwdP7AsqTur4a0vYItpjwDBFGnlA=',
  'salt'
);
INSERT INTO users (email, name, password, salt) VALUES ('student2@localhost', 'Test2 Student2',
  'xeR41ZKIyEGqUw22hFxMjZYok6ABzk4RpJY4c6qYE0r3rZjBtFjOP9dMo1vro82nuNEDjWqHBxuRj4N0BfP+dyj/5/CXb8Nd2C/A5eRs6c4mp4iyx9GD+lv42WB+7NcdAbTxGa8RtXgqLrTfD97OoJI8ABKpcXPOeUab0Jzi2J9jYCF5lnVuj7QsM1SmxYQfgseYSCCKzsv+DtSC0lVY2Ry6bCPXsZhSyeK5BZ060CHw3v7r62XT8mkNQ2i/M+TEFCJcYeGzOTKEjnAmr7lNfm069TpiLPwTUT5R5DGrnLH661vpD/Rma+qpdKpH+SAf1uIxF3GBnV6gFXElGfSNG1abYoud5xK36bdei+zHfMZ10Ncz9nYn6hzoTE03YgXpVtmmaAa7eg8YMTKHRxo43ONwJ5xPQkLNpWgwmLCGM0NrNDJeTvMNJstYPMiLUR5RFpgGhm/zphepxmoTOE6AH5kUu66rzNCFimUtY4vCL44jnSfkqDkm0MprUW2Q4Euhx3BzmXZkFEkm3ruhdxAy2qy/rENnb9b5BOrcVKn8nL+XCvbmyZJkTQynhdRcRA7zm6RVf0NRI9UDci08LlSLmFSKhi3qhSgCLJ4HDUSCApjpvLj60Pkdg5KfruvDEWwCzWD2a+r3hDVoGsbhwdP7AsqTur4a0vYItpjwDBFGnlA=',
  'salt'
  );
INSERT INTO users (email, name, password, salt) VALUES ('teacher@localhost', 'Test Teacher',
  'xeR41ZKIyEGqUw22hFxMjZYok6ABzk4RpJY4c6qYE0r3rZjBtFjOP9dMo1vro82nuNEDjWqHBxuRj4N0BfP+dyj/5/CXb8Nd2C/A5eRs6c4mp4iyx9GD+lv42WB+7NcdAbTxGa8RtXgqLrTfD97OoJI8ABKpcXPOeUab0Jzi2J9jYCF5lnVuj7QsM1SmxYQfgseYSCCKzsv+DtSC0lVY2Ry6bCPXsZhSyeK5BZ060CHw3v7r62XT8mkNQ2i/M+TEFCJcYeGzOTKEjnAmr7lNfm069TpiLPwTUT5R5DGrnLH661vpD/Rma+qpdKpH+SAf1uIxF3GBnV6gFXElGfSNG1abYoud5xK36bdei+zHfMZ10Ncz9nYn6hzoTE03YgXpVtmmaAa7eg8YMTKHRxo43ONwJ5xPQkLNpWgwmLCGM0NrNDJeTvMNJstYPMiLUR5RFpgGhm/zphepxmoTOE6AH5kUu66rzNCFimUtY4vCL44jnSfkqDkm0MprUW2Q4Euhx3BzmXZkFEkm3ruhdxAy2qy/rENnb9b5BOrcVKn8nL+XCvbmyZJkTQynhdRcRA7zm6RVf0NRI9UDci08LlSLmFSKhi3qhSgCLJ4HDUSCApjpvLj60Pkdg5KfruvDEWwCzWD2a+r3hDVoGsbhwdP7AsqTur4a0vYItpjwDBFGnlA=',
  'salt'
);

INSERT INTO lessons (lesson_date, tutor, student) VALUES ('1999-01-01', 3, 1);
INSERT INTO lessons (lesson_date, tutor, student) VALUES ('1999-02-01', 3, 1);
INSERT INTO lessons (lesson_date, tutor, student) VALUES ('2015-02-01', 3, 2);

INSERT INTO payments (description, amount, userid, lessonid, status)
  VALUES ('test payment', 20, 1, 1, 'paid');
INSERT INTO payments (description, amount, userid, lessonid, status)
  VALUES ('test payment 2', 10, 1, 2, 'unpaid');
INSERT INTO payments (description, amount, userid, lessonid, status)
  VALUES ('test payment 3', 30, 2, 3, 'unpaid');
