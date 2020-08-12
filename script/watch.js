const fs = require('fs');
const path = require('path');
var currentPath = process.cwd(); // 获取当前执行路径
const listenPath = 'server';
const filePath = path.join(currentPath,listenPath);
const childProcess = require('child_process');


function start() {
  childProcess.exec("npm run server",(error, stdout, stderr)=>{
    if (error) {
      console.log('exec error: ' + error);
    }
  });
  console.log('server start');
}

console.log(`正在监听 ${filePath}`);

let fsWait = null;

fs.watch(filePath,(event,filename)=>{
  if (filename){
    fsWait && clearTimeout(fsWait);
    fsWait = setTimeout(() => {
      // const target = process.env.npm_lifecycle_event;
      // const pathName = path.join(filePath, filename);
      console.log(`${filename}文件发生变动`);
      console.log('server stopping ~~~');
      childProcess.exec("npm run stop",(error, stdout, stderr)=>{
        if (error) {
          console.log('exec error: ' + error);
        } else {
          console.info('restarting ~~~')
          start()
          console.log('stdout: '+stdout)

          console.log('stderr: '+stderr)
        }
      });

    }, 100)
  }
});

start();

