var config = {};
config.db_connection_string = process.env.DATABASE_URL; //'postgres://tm:tm@localhost:5432/tm';
config.session = {
  secret: 'hello secret',
};

config.SALT_WORK_FACTOR = 10;

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



module.exports = config;
