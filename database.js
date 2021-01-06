const pg = require('pg');

var config = {
    user: 'postgres',
    host: 'localhost',
    database: 'testdb',
    password: '1234abcd',
    port: 5432,
    max:10,
    idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);
pool.on('error',function(err,client){
    console.error('client error',err.message,err.stack);
});

module.exports.pool = pool;
module.exports.query = function (text, values, callback) {
    console.log('query:', text, values);
    return pool.query(text, values, callback);
  };

  module.exports.connect = function (callback) {
    return pool.connect(callback);
  };




