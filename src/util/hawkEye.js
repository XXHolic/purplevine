import { func } from "prop-types";

// 获取客户端基础信息，提供主动捕获发送请求一些公用的方法
class BaseClient {
  constructor() {

  }

  // 主动捕获
  capture() {

  }

  createFetch() {

  }

  createXHR() {

  }

  combineRequestBody() {

  }

  send() {

  }

  /**
   * 获取用户信息
   */
  // getUserData() {
  //   let defaultData = {
  //     userId: null, // 默认是 0
  //     userStatus: null, //  默认是 1 ，表示可用
  //     userGroups:[],
  //     userLicenses:[],
  //   };

  //   return {...defaultData};
  // }

  // 获取行为信息
  // getActionData({errData}) {
  //   const {path=null,target=null} = errData;
  //   let data = {
  //     action: null,
  //     path: path,
  //     data: null,
  //     dataSources: null,
  //     targetElement: target,
  //     targetDOMPath: null,
  //     targetCSS: {},
  //     targetAttrs: {}
  //   };

  //   return {...data};
  // }

  // 获取异常信息
  getErrorData({errData}) {
    const {type,timeStamp,lineno=null,colno=null,message=null,error=null,filename=null} = errData;
    let data = {
      errorType: type,
      errorLevel: null,
      errorStack: error,
      errorFilename: filename,
      errorLineNo: lineno,
      errorColNo: colno,
      errorMessage: message,
      errorTimeStamp: timeStamp,
      eventType: null,
      pageX: null,
      pageY: null,
      screenX: null,
      screenY: null,
      eventKey: null,
    };
    return {...data};
  }

  // 获取环境信息
  getEnvironmentData() {
    const {innerWidth,innerHeight,screen,navigator} = window;
    const {appName,appVersion,userAgent,platform} = navigator;
    let defaultData = {
      pageW: innerWidth,
      pageH: innerHeight,
      screenW: screen.width,
      screenH: screen.height,
      network: null,
      userAgent: userAgent,
      appName: appName,
      system: platform,
      appVersion: appVersion,
    };

    return {...defaultData};
  }

  // 组装基础数据
  // combineBaseData({errData}) {
  //   let userData = this.getUserData();
  //   let actionData = this.getActionData({errData});
  //   let errorData = this.getErrorData({errData});
  //   let environData = this.getEnvironmentData();
  //   return {
  //     ...userData,
  //     ...actionData,
  //     ...errorData,
  //     ...environData,
  //   }
  // }

  // 发送数据
  send({errData}) {
    const data = this.combineData({errData});
  }

}


// 以下为新的思路


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

// 获取全局属性
function getGlobalObject() {
  typeof window !== 'undefined' ? window : fallbackGlobalObject;
}

// 扩展属性
function fill(source, name, replacement) {
  if (!(name in source)) {
      return;
  }
  const original = source[name];
  const wrapped = replacement(original);
  source[name] = wrapped;
}

// 重写原生的一些异常相关的方法
class GlobalHandlers {
  constructor(options={}) {
    // 重写的一些默认方法
    const defaultOptions = {
      onerror:true,onunhandledrejection:true,eventTarget: true,
    };
    this.global = getGlobalObject();
    this.options = {...defaultOptions,...options}
    this.init();
  }

  init() {
    // const global = getGlobalObject();
    const {eventTarget,XMLHttpRequest} = this.options;
    if (onerror) {
      this.wrapOnerror()
    }
    if (eventTarget) {
      this.wrapOnunhandledrejection()
    }
    if (eventTarget) {
      this.wrapEventTarget()
    }
  }

  wrapOnerror() {
    const global = this.global;
    // 有可能已有被重写了，所以要暂存下来
    const oldOnError = global.onerror;

    addHandler({
      type:'error',
      fn:()=>{}
    })

    global.onerror = function(msg, url, line, column, error) {
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

    addHandler({type:'unhandledrejection',fn:{
      // 获取一些本地信息等上报
    }})

    global.onunhandledrejection = function(e) {
      triggerHandlers('unhandledrejection', e);
      if (oldOnError) {
        return oldOnError.apply(this, arguments);
      }
      return true;
    }

  }

  wrapEventTarget() {
    const global = this.global;
    const proto = global.EventTarget && global.EventTarget.prototype;
    if(!proto) {
      return;
    }

    fill(global,'addEventListener',function(original){
      return function(eventName,fn,options) {
        // 添加重写的标志
        Object.defineProperty(fn, '__wrapped__', {
            enumerable: false,
            value: true,
        });
        original.call(this,eventName,fn,options);
      }
    });

    fill(global,'removeEventListener',function(original){
      return function(eventName,fn,options) {
        // 添加重写的标志
        Object.defineProperty(fn, '__wrapped__', {
            enumerable: false,
            value: true,
        });
        original.call(this,eventName,fn,options);
      }
    });

  }


}

const init = (options={}) => {
  const defaultOptions = {
    url:'' // 上报的请求
  }
  const client = new BaseClient();
  new GlobalHandlers();
};

export {init}
