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
  show:(showEle,hideEle) => {
    showEle.style.display = "block";
    if (hideEle) {
      hideEle.style.display = "none";;
    }
  },
  hide:(ele) => {
    ele.style.display = "none";
  }
}

// 避免重复绑定事件
const addEventOnce = (ele, eventName, handler) => {
    if (ele.clickHandler) {
      ele.removeEventListener(eventName, ele.clickHandler);
    }
    ele.clickHandler = handler;
    ele.addEventListener(eventName, ele.clickHandler);
}

export { spin, info, showTrigger, addEventOnce };