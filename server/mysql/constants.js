module.exports = {
  serverPort: 9001,
  dbPort: 3306,
  listenPath: 'server/mysql',
  serverEntry: 'server.js',
  host: 'localhost',
  user: 'root',
  password: '123456',
  dbName: 'purplevine',
  tableNameMap: {
    issue: 'issue',
    issueDetail: 'issueDetail',
  }
}
