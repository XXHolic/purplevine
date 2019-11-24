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
  getActionData() {
    let defaultData = {
      action: null,
      path: null,
      data: null,
      dataSources: null,
      targetElement: null,
      targetDOMPath: null,
      targetCSS: {},
      targetAttrs: {}
    };

    return {...defaultData};
  }

  // 获取异常信息
  getErrorData({errData}) {
    let defaultData = {
      errorType: null,
      errorLevel: null,
      errorStack: null,
      errorFilename: null,
      errorLineNo: null,
      errorColNo: null,
      errorMessage: null,
      errorTimeStamp: null,
      eventType: null,
      pageX: null,
      pageY: null,
      screenX: null,
      screenY: null,
      eventKey: null,
    };

    return {...defaultData};

  }

  // 获取环境信息
  getEnvironmentData() {
    let defaultData = {
      pageW: null,
      pageH: null,
      screenW: null,
      screenH: null,
      network: null,
      userAgent: null,
      device: null,
      system: null,
      appVersion: null,
      apiVersion: null,
    };

    return {...defaultData};
  }

  // 组装数据
  combineData({errData}) {
    let userData = this.getUserData();
    let actionData = this.getActionData();
    let errorData = this.getErrorData({errData});d
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