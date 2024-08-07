
import { addEventOnce } from "./util.js";


const lmpLrc = document.querySelector('#lmpLrc');

const formatTime = (str) => {
  const timeArr = str.split(":");
  const secTime = parseFloat(timeArr[1]);
  const sec = parseFloat(timeArr[0]) * 60 + secTime;
  return sec;
}

const formatLrc = (str) => {
  const rowArr = str.split('\n');
  const arr = rowArr.map(ele => {
    const pos = ele.indexOf(']');
    const time = formatTime(ele.substring(1, pos));
    const text = ele.substring(pos + 1, ele.length);
    return { time, text }
  })
  return arr;
}

let lrcData = [];

const initLrc = (str) => {
  lrcData = formatLrc(str);
  const eleStr = lrcData.reduce((acc, cur, index) => {
    const { time, text } = cur;
    acc += `<div class="lmp-lrc-row" data-index=${index}>${text}</div>`;
    return acc;
  }, '')
  lmpLrc.innerHTML = eleStr;
}

const getPlayIndex = (playTime) => {
  const len = lrcData.length;
  for (let index = 0; index < len; index++) {
    const { time } = lrcData[index];
    if (playTime <= time) {
      return index
    }
  }

  return len;
}

const moveLrc = (time) => {
  const playIndex = getPlayIndex(time);
  const containerHeight = 70;
  const lrcRow = document.querySelector('.lmp-lrc-row');
  const rowHeight = lrcRow.getBoundingClientRect().height;
  let movePy = rowHeight / 2 + containerHeight / 2;
  if (playIndex > 0) {
    movePy = movePy + rowHeight * (playIndex - 1);
  }

  const lightRow = lmpLrc.querySelector('.lmp-lrc-row.active');
  if (lightRow) {
    lightRow.setAttribute('class', 'lmp-lrc-row')
  }

  const selector = `.lmp-lrc-row[data-index='${playIndex - 1}']`;
  const targetRow = lmpLrc.querySelector(selector);
  if (targetRow) {
    targetRow.setAttribute('class', 'lmp-lrc-row active')
  }
  lmpLrc.style.transform = `translateY(-${movePy}px)`;
}

const showFullLrc = () => {
  const lrcDia = document.querySelector('#lrcDia');
  const lrcDiaClose = document.querySelector('#lrcDiaClose');
  const lrcFullSection = document.querySelector('#lrcFullSection');
  const eleStr = lrcData.reduce((acc, cur, index) => {
    const { time, text } = cur;
    acc += `<div class="lmp-full-row">${text}</div>`;
    return acc;
  }, '')
  lrcFullSection.innerHTML = eleStr;
  lrcDia.showModal();
  addEventOnce(lrcDiaClose, "click", (e) => {
    lrcFullSection.scrollTop = 0;
    lrcDia.close();
  });
}

export { formatLrc, initLrc, moveLrc, showFullLrc };