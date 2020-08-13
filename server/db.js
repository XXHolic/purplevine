const MongoClient = require('mongodb').MongoClient;
const {dbConnectUrl,dbName} = require('../server/constants');

/**
 * 增加表中的数据
 * @param {*} name 表的名称
 * @param {*} options 相关其它参数
 */
const dbAdd = (name='', options={}) => {

  return new Promise((resolve, reject) => {

    const client = new MongoClient(dbConnectUrl, {useNewUrlParser: true, useUnifiedTopology:true});
    client.connect(function(err) {
      if (err) {
        reject({message:'connect err',err:err});
        return;
      };

      let db = client.db(dbName);
      const {data=[]} = options;
      const isExist = db.collection(name);

      if (!isExist) {
        resolve({code: 500,data:null,message:'目标集合不存在！'})
        return;
      }
      // 在已有表中插入新的数据
      db.collection(name).insertMany(data, function(err, res) {
        if (err) reject({message:'insert err',err:err});;
        resolve({code: 200,data:null,message:'添加数据成功'})
        client.close();
      });

      // 插入新的表，不能对接口提供
      // if (isAddCollection) {
      //   if (isExist) {
      //     const tipMsg = "集合已存在！"
      //     resolve({code: 500,data:null,message:tipMsg});
      //     return;
      //   }
      //   db.createCollection(name,{},function (err, res) {
      //     if (err) reject({message:'createCollection err',err:err});

      //     resolve({code: 200,data:null,message:'创建集合成功'})
      //     client.close();
      //   });
      // } else {

      // }


    });
  });

};

/**
 * 删除表中的数据
 * @param {*} name 表的名称
 * @param {*} options  {isAddCollection:true}
 */
const dbDelete = (name='', options={}) => {

  return new Promise((resolve, reject) => {

    const client = new MongoClient(dbConnectUrl, {useNewUrlParser: true, useUnifiedTopology:true});
    client.connect(function(err) {
      if (err) {
        reject({message:'connect err',err:err});
        return;
      };

      let db = client.db(dbName);
      const {query={}} = options;
      const isExist = db.collection(name);
      if (!isExist) {
        resolve({code: 500,data:null,message:'目标集合不存在！'});
        return;
      }
      const whereStr = query;
      db.collection(name).deleteMany(whereStr, function(err, res) {
        if (err) reject({message:'delete err',err:err});;
        resolve({code: 200,data:null,message:'删除数据成功'})
        client.close();
      });


    });
  });

};

/**
 * 查询
 * @param {*} name 集合名
 * @param {*} options 查询等相关参数
 */
const dbQuery = (name='', options={}) => {
  return new Promise((resolve) => {
    const client = new MongoClient(dbConnectUrl, {useNewUrlParser: true, useUnifiedTopology:true});
    client.connect(function(err) {
      if (err) {
        reject({message:'connect err',err:err});
        return;
      }

      let db = client.db(dbName);
      const {query={}} = options;
      const isExist = db.collection(name);
      if (!isExist) {
        const tipMsg = "目标集合不存在！";
        resolve({code: 500,data:null,message: tipMsg})
        return;
      }
      const whereStr = query;  // 查询条件
      db.collection(name).find(whereStr).toArray(function(err, result) {
          if (err) {
            reject({message:'query err',err:err});
            return;
          }
          resolve({code:200,data:result,message:'查询成功'});
          client.close();
      });
    });
  });

};

/**
 * 更新
 * @param {*} name 集合名
 * @param {*} options 查询等相关参数
 */
const dbUpdate = (name='', options={}) => {
  return new Promise((resolve) => {
    const client = new MongoClient(dbConnectUrl, {useNewUrlParser: true, useUnifiedTopology:true});
    client.connect(function(err) {
      if (err) {
        reject({message:'connect err',err:err});
        return;
      }

      let db = client.db(dbName);
      const {query={},newData={}} = options;
      const isExist = db.collection(name);
      if (!isExist) {
        const tipMsg = "目标集合不存在！";
        resolve({code: 500,data:null,message: tipMsg})
        return;
      }
      const whereStr = query;  // 查询条件
      const updateStr = {$set: newData};
      db.collection(name).updateMany(whereStr,updateStr,function(err, result) {
          if (err) {
            reject({message:'update err',err:err});
            return;
          }
          resolve({code:200,data:null,message:'更新成功'});
          client.close();
      });
    });
  });

};

module.exports = {dbAdd, dbDelete, dbQuery, dbUpdate};
