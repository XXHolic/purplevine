/* eslint-disable */
const sourceMap = require("source-map");

// 获取客户端基础信息
class BaseClient {
  constructor() {
    this.options = {
      headers:{
        'Content-Type': 'application/json'
      }
    }
  }

  bindOptions(options) {
    this.options = {...this.options,...options}
  }

  // 主动捕获
  capture(data) {
    console.info('capture')
    this.send(data);
  }

  createFetch(data) {
    const {url,headers} = this.options;
    const reqOptions = {
      body: JSON.stringify(data),
      method: 'POST',
      // method: 'GET',
      headers:{...headers}
    }

    fetch(url,{...reqOptions});
  }

  createXHR(data) {
    const {url,headers} = this.options;
    const request = new XMLHttpRequest();
    // request.onreadystatechange = () => {

    // };
    request.open('POST', url);
    for (const header in headers) {
        if (headers.hasOwnProperty(header)) {
            request.setRequestHeader(header, headers[header]);
        }
    }
    request.send(JSON.stringify(data));
  }

  // 获取环境基本信息
  getUserAgent() {
    const global = getGlobalObject();
    let data = {
      pageW: null,
      pageH: null,
      screenW: null,
      screenH: null,
      network: null,
      userAgent: null,
      appName: null,
      system: null,
      appVersion: null,
    };
    const {innerWidth,innerHeight,screen,navigator} = global;
    if (innerWidth) {
      data.pageW = innerWidth;
      data.pageH = innerHeight;
    }

    if(screen) {
      data.screenW = screen.width;
      data.screenH = screen.height;
    }

    if (navigator) {
      const {appName,appVersion,userAgent,platform} = navigator;
      data.appName = appName;
      data.appVersion = appVersion;
      data.userAgent = userAgent;
      data.platform = platform;
    }

    return data;
  }

  // 发送数据
  send(data) {
    const environment = this.getUserAgent()
    // console.info('environment',environment)
    if (!data.environment) {
      data.environment = environment;
    }
    if(supportsFetch()) {
      this.createFetch(data);
      return;
    }
    this.createXHR(data);
  }

}

const baseClient = new BaseClient();

function supportsFetch() {
  if (!('fetch' in getGlobalObject())) {
      return false;
  }
  return true;
}

// 事件统一发布订阅
const handlers ={}

function addHandler(handler) {
  if (!handler || typeof handler.type !== 'string' ) {
    return;
  }
  handlers[handler.type] = handlers[handler.type] || [];
  handlers[handler.type].push(handler.fn);
}

function triggerHandler(type, data) {
  if (!type || !handlers[type]) {
      return;
  }
  for (const handler of handlers[type] || []) {
      try {
          handler(data);
      }
      catch (e) {
        console.error('Error while triggering handler')
      }
  }
}


const fallbackGlobalObject = {};

// 获取全局属性，在其它的一些环境（例如 node）中，可能没有 window 对象
function getGlobalObject() {
  return typeof window !== 'undefined' ? window : fallbackGlobalObject;
}

  /**
   * 生成唯一标志
   */
  function uuid4() {
    const global = getGlobalObject();
    const crypto = global.crypto || global.msCrypto;
    if (!(crypto === void 0) && crypto.getRandomValues) {
        // Use window.crypto API if available
        const arr = new Uint16Array(8);
        crypto.getRandomValues(arr);
        // set 4 in byte 7
        // eslint-disable-next-line no-bitwise
        arr[3] = (arr[3] & 0xfff) | 0x4000;
        // set 2 most significant bits of byte 9 to '10'
        // eslint-disable-next-line no-bitwise
        arr[4] = (arr[4] & 0x3fff) | 0x8000;
        const pad = (num) => {
            let v = num.toString(16);
            while (v.length < 4) {
                v = `0${v}`;
            }
            return v;
        };
        return (pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) + pad(arr[5]) + pad(arr[6]) + pad(arr[7]));
    }
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
        // eslint-disable-next-line no-bitwise
        const r = (Math.random() * 16) | 0;
        // eslint-disable-next-line no-bitwise
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

// 扩展属性，避免覆盖已存在的方法
function fill(source, name, replacement) {
  if (!(name in source)) {
      return;
  }
  const original = source[name];
  const wrapped = replacement(original);
  source[name] = wrapped;
}

// const debounceDuration = 1000;
let debounceTimer = 0;
let lastCapturedEvent;
function domEventHandler(name, handler, debounce = false) {
  return (event) => {

      // It's possible this handler might trigger multiple times for the same
      // event (e.g. event propagation through node ancestors). Ignore if we've
      // already captured the event.
      if (!event || lastCapturedEvent === event) {
          return;
      }
      lastCapturedEvent = event;
      if (debounceTimer) {
          clearTimeout(debounceTimer);
      }
      if (debounce) {
          debounceTimer = setTimeout(() => {
              handler({ event, name });
          });
      }
      else {
          handler({ event, name });
      }
  };
}


// 重写原生的一些异常相关的方法
class GlobalHandlers {
  constructor() {
    // 重写的一些默认方法
    this.defaultOptions = {
      onerrorMark:true,onunhandledrejectionMark:true,eventTargetMark: true,
    };
    this.global = getGlobalObject();

  }

  bindOptions(options) {
    this.options = {...this.defaultOptions,...options}
    this.init();
  };

  init() {
    // const global = getGlobalObject();
    const {onerrorMark,onunhandledrejectionMark,eventTargetMark} = this.options;
    if (onerrorMark) {
      this.wrapOnerror()
    }
    if (onunhandledrejectionMark) {
      this.wrapOnunhandledrejection()
    }
    if (eventTargetMark) {
      // this.wrapEventTarget()
    }
  }

  wrapOnerror() {
    const global = this.global;
    // 有可能已有被重写了，所以要暂存下来
    const oldOnError = global.onerror;

    addHandler({
      type:'error',
      fn:(data)=>{
        const eventId = uuid4()
        baseClient.send({type:'error',eventId:eventId,exception:data});
      }
    })

    global.onerror = function(msg, url, line, column, error) {
      // console.info({msg, url, line, column, error})
      triggerHandler('error', {
          column,
          error,
          line,
          msg,
          url,
      });
      if (oldOnError) {
        return oldOnError.apply(this, arguments);
      }
      return false;
    }

  }

  wrapOnunhandledrejection() {
    const global = this.global;
    // 有可能已有被重写了，所以要暂存下来
    const oldOnError = global.onunhandledrejection;

    addHandler({type:'unhandledrejection',fn:(data) => {
      console.info('unhandledrejection',data);
      // baseClient.send(data);
    }})

    global.onunhandledrejection = function(e) {
      triggerHandler('unhandledrejection', e);
      if (oldOnError) {
        return oldOnError.apply(this, arguments);
      }
      return true;
    }

  }

  wrapEventTarget() {
    const global = this.global;

    if (!('document' in global)) {
      return;
    }
    addHandler({type:'dom',fn:(data) => {
      console.info('dom data',data)
      // baseClient.send(data);
    }})

    global.document.addEventListener('click', domEventHandler('click', triggerHandler.bind(null, 'dom')), true);


    const proto = global.EventTarget && global.EventTarget.prototype;
    if(!proto) {
      return;
    }

    // react 中不能放到生命周期中，会中止渲染
      fill(proto,'addEventListener',function(original){
        return function(eventName,fn,options) {

          const wrapFn= (...args) => {
            try {
              fn.apply(this,args);
            } catch (error) {
              console.info('addEventListener error',error)
              // throw error;
            }
          }
          return original.call(this,eventName,wrapFn,options);
        }
      });

  }


}

const globalHandlers = new GlobalHandlers();

const init = (options={}) => {
  const defaultOptions = {
    url:'http://localhost:9001/error' // 上报的请求
  }
  const combineOptions = {...defaultOptions,...options}
  globalHandlers.bindOptions(combineOptions);
  baseClient.bindOptions(combineOptions);
};

const captureMessage = baseClient.capture.bind(baseClient);

export {init,captureMessage}
