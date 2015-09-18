# TutorManger

![Build Status](https://travis-ci.org/ioionu/TutorManger.svg?branch=master)

CRM for Tutors.

## Dependencies

Application dependencies are defined in package.json and bower.json. Running "npm install"
and "bower install" should install everything you need. Please refer to the npm
and bower manuals.

The application assumes a PostgreSQL database is available and appropriately
configured.

## Install

```
git clone https://github.com/ioionu/TutorManger.git
cd tutormanager
npm install
bower install
```

## Run

```
npm install -g foreman
nf start
```

should be up and running on:

 * http://localhost:5000/

If you are running the application for the first time you can install a demo DB

 * http://localhost:5000/installer

## Configure

Environment configuration can be managed with the .env file

## Tests

To run unit test ensure that karma and jasmin are installed and available in you path.

In the root directory of the project run:

```
karma start spec/karma.conf.js
```
