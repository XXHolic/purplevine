module.exports = {
  port: 9001,
  listenPath: 'server/mongodb',
  serverEntry: 'server/server.js',
  dbConnectUrl: 'mongodb://localhost:27017',
  dbName: 'purplevine',
  tableNameMap: {
    issue: 'issue',
    issueDetail: 'issueDetail',
  }
}
