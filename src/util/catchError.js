class CatchError {
  constructor() {

  }

  // 监听事件
  initErrorEvent() {

    // window.onerror = function(message, source, lineno, colno, error) {
    //   this.send({errData:{message, source, lineno, colno, error}});
    // }

    // 资源加载异常
    window.addEventListener('error', (error) => {
      this.send({errData:error});
    }, true);

    // promise 异常
    window.addEventListener("unhandledrejection", function(error){
      this.send({errData:error});
    });
  }

  /**
   * 获取用户信息
   */
  getUserData() {
    let defaultData = {
      userId: null, // 默认是 0
      userStatus: null, //  默认是 1 ，表示可用
      userGroups:[],
      userLicenses:[],
    };

    return {...defaultData};
  }

  // 获取行为信息
  getActionData({errData}) {
    const {path=null,target=null} = errData;
    let data = {
      action: null,
      path: path,
      data: null,
      dataSources: null,
      targetElement: target,
      targetDOMPath: null,
      targetCSS: {},
      targetAttrs: {}
    };

    return {...data};
  }

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

  // 组装数据
  combineData({errData}) {
    let userData = this.getUserData();
    let actionData = this.getActionData({errData});
    let errorData = this.getErrorData({errData});
    let environData = this.getEnvironmentData();
    return {
      ...userData,
      ...actionData,
      ...errorData,
      ...environData,
    }
  }

  // 发送数据
  send({errData}) {
    const data = this.combineData({errData});
  }

}

const init = (options={}) => {

};

export {init}
