const fs = require('fs');
const path = require('path');
const {listenPath,serverEntry} = require('../server/constants');
var currentPath = process.cwd(); // 获取当前执行路径
const filePath = path.join(currentPath,listenPath);
const childProcess = require('child_process');


function start() {
  // 方式1 这种方式，子脚本的日志不会打印处理
  // childProcess.exec("npm run server",(error, stdout, stderr)=>{
  //   if (error) {
  //     console.log('exec error: ' + error);
  //   } else {
  //     console.log(stderr);
  //   }
  // });

  // 方式2:http://nodejs.cn/api/child_process.html#child_process_subprocess_send_message_sendhandle_options_callback
  const parent = childProcess.fork(`${filePath}/${serverEntry}`);
  // parent.on('message', (m) => {
  //   console.log('父进程收到消息', m);
  // });

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
          start();
          // console.log(stderr);
        }
      });

    }, 100)
  }
});

start();

