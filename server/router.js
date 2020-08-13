var formidable = require('formidable');
// const https = require('https');
// var util = require('util');
const {dbQuery,dbAdd,dbDelete,dbUpdate} = require('./db');
// import client from './db';

module.exports = {
  index: (ctx) => {

    ctx.body = 'Hello Koa';

  },

};
