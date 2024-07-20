const spin = {
  show: () => {
    const ele = document.querySelector("#lmpSpin");
    ele.style.display = 'block'
  },
  hide: () => {
    const ele = document.querySelector("#lmpSpin");
    ele.style.display = "none";
  }
}

const info = {
  show: (str, time = 2000) => {
    const ele = document.querySelector("#lmpInfo");
    ele.style.display = "block";
    ele.innerHTML = str ? str : "操作成功";
    setTimeout(() => {
      ele.style.display = "none";
    }, time);
  },
  err: (str, time = 2000) => {
    const ele = document.querySelector("#lmpInfo");
    ele.style.display = "block";
    ele.innerHTML = `<div style="color:red">${str}</div>`;
    setTimeout(() => {
      ele.innerHTML='';
      ele.style.display = "none";
    }, time);
  },
  hide: () => {
    const ele = document.querySelector("#lmpInfo");
    ele.innerHTML = "";
    ele.style.display = "none";
  },
};

const showTrigger = {
  show: (showEle, hideEle) => {
    if (Array.isArray(showEle)) {
      showEle.forEach((ele) => {
        ele.style.display = "block";
      });
    } else {
      showEle.style.display = "block";
    }
    if (hideEle) {
      if (Array.isArray(hideEle)) {
        hideEle.forEach((ele) => {
          ele.style.display = "none";
        });
      } else {
        hideEle.style.display = "none";
      }
    }
  },
  hide: (hideEle) => {
    if (Array.isArray(hideEle)) {
      hideEle.forEach((ele) => {
        ele.style.display = "none";
      });
    } else {
      hideEle.style.display = "none";
    }
  },
};

// 避免重复绑定事件
const addEventOnce = (ele, eventName, handler) => {
    if (ele.clickHandler) {
      ele.removeEventListener(eventName, ele.clickHandler);
    }
    ele.clickHandler = handler;
    ele.addEventListener(eventName, ele.clickHandler);
}

const formatSeconds = (value) => {
  var theTime = parseInt(value); // 秒
  var theTime1 = 0; // 分
  var theTime2 = 0; // 小时
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60);
      theTime1 = parseInt(theTime1 % 60);
    }
  }

  var result = "" + parseInt(theTime); //秒
  if (10 > theTime > 0) {
    result = "0" + parseInt(theTime); //秒
  } else {
    result = "" + parseInt(theTime); //秒
  }

  if (10 > theTime1 > 0) {
    result = "0" + parseInt(theTime1) + ":" + result; //分，不足两位数，首位补充0，
  } else {
    result = "" + parseInt(theTime1) + ":" + result; //分
  }
  if (theTime2 > 0) {
    result = "" + parseInt(theTime2) + ":" + result; //时
  }
  return result;
}

export { spin, info, showTrigger, addEventOnce, formatSeconds };