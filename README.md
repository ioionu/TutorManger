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

### Development Environment

Environment configuration can be managed with the .env file.

A template .env file _example_.env is located in the root of the project. Simply
rename this file and update its contents to reflect your development environment.

### Heroku Production Environment

Configuration on Heroku is achieved by use of environment variables. These must
be setup and configured in the Heroku environment administration page.

Configuration variable can be located under the "Settings" tab withing your
application settings. Click on "Reveal Config Vars" then add:

 * DATABASE_URL
 * email_from
 * email_password
 * email_server
 * email_username
 * force_https
 * stripe_secret

## Tests

To run unit test ensure that karma and jasmin are installed and available in you path.

In the root directory of the project run:

```
karma start spec/karma.conf.js
```

## Deploy

For information on deploying to Heroku please refer to the Heroku developer documentation.

https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app

```
git push heroku master
```
