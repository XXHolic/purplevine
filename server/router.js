var formidable = require('formidable');
// const https = require('https');
// var util = require('util');
const {dbQuery,dbAdd,dbDelete,dbUpdate} = require('./db');
// import client from './db';

module.exports = {
  index: (ctx) => {
    // res.setHeader("Access-Control-Allow-Headers","Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    // res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // dbAdd('test',{isAddCollection:false,data:[{name:'test2',password:'12345678',email:'2222333@qq.com'}]}).then((res)=>{
    //   console.info('结果:',res)
    // }).catch(err => {
    //   console.info('结果:',err)
    // })
    // dbQuery('test').then((res) => {
    //   console.info('结果:',res)
    // })
    // dbDelete('test',{query:{name:'test2'}}).then((res) => {
    //   console.info('结果:',res)
    // }).catch((err)=>{
    //   console.info('err:',err)
    // })
    dbUpdate('test',{query:{name:'test1'},newData:{email:'33333@qq.com'}}).then((res) => {
      console.info('结果:',res)
    }).catch((err)=>{
      console.info('err:',err)
    })
    ctx.body = 'Hello Koa';

  },

};
