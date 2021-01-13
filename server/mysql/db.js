const mysql = require('mysql');
const { dbName, host, user, password, dbPort } = require("./constants");

const client = (sql) => {
  return new Promise((resolve) => {
    var connection = mysql.createConnection({
      host: host,
      port: dbPort,
      user: user,
      password: password,
      database: dbName,
    });

    connection.connect();

    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      resolve(results, fields);
    });

    connection.end();
  })

};

module.exports = client;
