var config = {};
config.db_connection_string = process.env.DATABASE_URL; //'postgres://tm:tm@localhost:5432/tm';
config.session = {
  secret: 'hello secret',
};

config.SALT_WORK_FACTOR = 10;

config.paypal = {
  configure: {
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.cc_client_id,
    'client_secret': process.env.cc_client_secret,
  }
};

module.exports = config;
