var config = {};
config.db_connection_string = process.env.DATABASE_URL; //'postgres://tm:tm@localhost:5432/tm';
config.session = {
  secret: 'hello secret',
};

config.SALT_WORK_FACTOR = 10;

config.email = {
  configure: {
    server: process.env.email_server,
    username: process.env.email_username,
    password: process.env.email_password,
    from: process.env.email_from
  }
};

config.paypal = {
  configure: {
    'mode': process.env.cc_mode, //sandbox or live or offline
    'client_id': process.env.cc_client_id,
    'client_secret': process.env.cc_client_secret,
  }
};

config.stripe = {
  configure: {
    'mode': process.env.stripe_mode, //sandbox or live or offline
    'public_key': process.env.stripe_public_key,
    'secret_key': process.env.stripe_secret,
  }
};

config.force_https = process.env.force_https;

module.exports = config;
