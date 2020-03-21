const mysql = require('mysql');

const client = (sql, arg, callback) => {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "purplevine",
  });

  connection.connect();

  connection.query(sql, arg, function(error, results, fields) {
    if (error) throw error;
    callback && callback(results, fields);
  });

  connection.end();
};

module.exports = client;