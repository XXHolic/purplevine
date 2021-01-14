const mysql = require('mysql');
const { dbName, host, user, password, dbPort } = require("./constants");
var connection = mysql.createConnection({
  host: host,
  port: dbPort,
  user: user,
  password: password,
  database: dbName,
});

const dbAdd = (sql, params) => {
  return new Promise((resolve) => {
    connection.connect();

    connection.query(sql, params, function (error, results) {
      if (error) throw error;
      resolve({ code: 200, data: results, message: "添加数据成功" });
    });

    connection.end();
  })

};

const dbDelete = (sql) => {
  return new Promise((resolve) => {
    connection.connect();

    connection.query(sql, function (error, results) {
      if (error) throw error;
      resolve({ code: 200, data: results, message: "删除数据成功" });
    });

    connection.end();
  })

};

const dbQuery = (sql) => {
  return new Promise((resolve) => {
    connection.connect();

    connection.query(sql, function (error, results) {
      if (error) throw error;
      resolve({ code: 200, data: results, message: "查询成功" });
    });

    connection.end();
  })

};

const dbUpdate = (sql, params) => {
  return new Promise((resolve) => {
    connection.connect();

    connection.query(sql, params, function (error, results) {
      if (error) throw error;
      resolve({ code: 200, data: results, message: "更新成功" });
    });

    connection.end();
  })

};

module.exports = { dbAdd, dbDelete, dbQuery, dbUpdate };
