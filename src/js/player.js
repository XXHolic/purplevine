import axios from "../asset/js/axios.min.js";
import Sortable from "../asset/js/sortable.esm.js";
import { api } from "./api.js";
import {
  spin,
  info,
  showTrigger,
  formatSeconds,
  addEventOnce,
} from "./util.js";

const expando = "player" + new Date().getTime();
class AudioPlayer {
  constructor(params) {
    const { ele, src } = params;
    ele[expando] = this;
    this.ele = ele;
    this.src = src;
  }

  static get(ele) {
    return ele[expando];
  }

  play() {
    this.ele.play();
  }

  pause() {
    this.ele.pause();
  }

  on(type, fun) {
    this.ele.addEventListener(type, fun);
  }
}

const audioEle = document.querySelector("#audioPlayer");
const playerMsg = document.querySelector("#playerMsg");
const playerTimeTotal = document.querySelector("#playerTimeTotal");
const playerPreload = document.querySelector("#playerPreload");
const playerPlaying = document.querySelector("#playerPlaying");
const playerTimePlaying = document.querySelector("#playerTimePlaying");

let preloadTimer = null;
let playingTimer = null;

const preloadProgress = () => {
  const buffered = audioEle.buffered;
  const width = parseFloat(playerPreload.style.width);
  if (width && width >= 100) {
    clearTimeout(preloadTimer);
    return;
  }
  const len = buffered.length;
  if (len) {
    const percent = (100 * buffered.end(len - 1)) / audioEle.duration;
    playerPreload.style.width = `${percent}%`;
  }
  preloadTimer = setTimeout(preloadProgress, 1000);
};

const playingProgress = () => {
  const width = parseFloat(playerPlaying.style.width);
  if (width && width >= 100) {
    clearTimeout(playingTimer);
    return;
  }
  const percent = (100 * audioEle.currentTime) / audioEle.duration;
  playerTimePlaying.innerHTML = formatSeconds(audioEle.currentTime);
  playerPlaying.style.width = `${percent}%`;
  playingTimer = setTimeout(playingProgress, 500);
};

const getMusic = async (params) => {
  const { status, data } = await axios.post(api.song, params);
  if (status == 200) {
    const { src, format, singerName, songName } = data;
    playerMsg.innerHTML = `${songName}-${singerName}`;
    playerTimeTotal.innerHTML = format;
    playerPlaying.style.width = "0%";
    audioEle.src = src;
    axios.post(api.currentAdd, params);
    const hasInstance = AudioPlayer.get(audioEle);
    if (!hasInstance) {
      const player = new AudioPlayer({ ele: audioEle, src });
      player.play();

      player.on("play", () => {
        preloadProgress();
        playingProgress();
      });

      player.on("pause", () => {
        clearTimeout(preloadTimer);
        clearTimeout(playingTimer);
      });

      player.on("ended", () => {
        clearTimeout(preloadTimer);
        clearTimeout(playingTimer);
        playerPreload.style.width = "0%";
      });
    }
  }
};

const audioEvent = () => {
  const playerControlBtn = document.querySelector("#playerControlBtn");
  const playerOperateBtn = document.querySelector("#playerOperateBtn");
  const playerCycleLoop = document.querySelector("#playerCycleLoop");
  // const playerCycleRandom = document.querySelector("#playerCycleRandom");
  const playerCycleOrder = document.querySelector("#playerCycleOrder");
  const playerPopList = document.querySelector("#playerPopList");
  const playerPopTriangle = document.querySelector("#playerPopTriangle");

  addEventOnce(playerControlBtn, "click", (e) => {
    if (!audioEle.src) {
      info.show("暂无歌曲播放");
      return;
    }
    const ele = e.target;
    const eleType = ele.getAttribute("data-type");
    console.info("eleType", eleType);
    switch (eleType) {
      case "pre": {
        break;
      }
      case "play": {
        if (audioEle.paused) {
          audioEle.play();
        } else {
          audioEle.pause();
        }
        break;
      }
      case "next": {
        break;
      }
    }
  });

  const getCurrent = async () => {
    spin.show();
    try {
      const { status, data } = await axios.get(api.current);
      if (status === 200) {
        const listStr = data.reduce((acc, cur, index) => {
          const { singerId, singerName, songId, songName } = cur;
          const rowCls = index % 2 ? "" : "lmp-song-odd";
          acc += `<div class="lmp-song-row ${rowCls}" data-songid=${songId} data-songname=${songName} data-singername=${singerName} data-singerid=${singerId}>
                        <div class="lmp-song-name">${songName}</div>
                        <div class="lmp-song-singer">
                          <span class="lmp-song-span lmp-cursor-pointer" data-id=${singerId} data-name=${singerName} data-type="jump">${singerName}</span>
                        </div>
                        <div class="lmp-song-operate">
                          <div class="lmp-operate-play lmp-cursor-pointer" title="播放">
                            <i class="fa-regular fa-circle-play fa-lg" data-id=${songId}  data-songname=${songName} data-singername=${singerName} data-singerid=${singerId} data-type="play"></i>
                          </div>
                          <div class="lmp-operate-add lmp-cursor-pointer" title="收藏">
                            <i class="fa-solid fa-folder fa-lg" data-id=${songId} data-type="move"></i>
                          </div>
                          <div class="lmp-operate-dele lmp-cursor-pointer" title="移除">
                            <i class="fa-solid fa-trash-can fa-lg" data-id=${songId} data-type="dele"></i>
                          </div>
                          <div class="lmp-operate-drag lmp-cursor-pointer" title="拖拽排序" data-id=${songId}>
                            <i class="fa-solid fa-bars fa-lg"></i>
                          </div>
                        </div>
                      </div>`;
          return acc;
        }, "");
        const listObj = document.querySelector("#playerPopBody");
        const listTotal = document.querySelector("#playerTotalCount");
        listObj.innerHTML = listStr;
        listTotal.innerHTML = `总共 ${data.length} 首`;
        setTimeout(() => {
          const hasInstance = Sortable.get(listObj);
          if (!hasInstance) {
            Sortable.create(listObj, {
              handle: ".lmp-operate-drag",
              animation: 150,
              draggable: ".lmp-song-row",
              onEnd: (evt) => {
                const newNodeList = listObj.querySelectorAll(".lmp-song-row");
                const newList = [];
                for (let i = 0; i < newNodeList.length; i++) {
                  const dataSongId = Number(
                    newNodeList[i].getAttribute("data-songid")
                  );
                  const dataSongName =
                    newNodeList[i].getAttribute("data-songname");
                  const dataSingerId = Number(
                    newNodeList[i].getAttribute("data-singerid")
                  );
                  const dataSingerName =
                    newNodeList[i].getAttribute("data-singername");
                  newList.push({
                    songId: dataSongId,
                    songName: dataSongName,
                    singerId: dataSingerId,
                    singerName: dataSingerName,
                  });
                }
                axios.post(api.currentSort, newList).then(() => {
                  getCurrent();
                });
              },
            });
          }
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      spin.hide();
    }
  };

  addEventOnce(playerOperateBtn, "click", (e) => {
    const ele = e.target;
    const eleType = ele.getAttribute("data-type");
    console.info("eleType", eleType);
    switch (eleType) {
      case "collect": {
        if (!audioEle.src) {
          info.show("暂无歌曲播放");
          return;
        }
        break;
      }
      case "playLoop": {
        showTrigger.show(playerCycleOrder, playerCycleLoop);
        break;
      }
      case "playRandom": {
        break;
      }
      case "playOrder": {
        showTrigger.show(playerCycleLoop, playerCycleOrder);
        break;
      }
      case "list": {
        if (playerPopList.style.display == "block") {
          showTrigger.hide([playerPopList, playerPopTriangle]);
        } else {
          showTrigger.show([playerPopList, playerPopTriangle]);
          getCurrent();
        }
        break;
      }
    }
  });
};

export { getMusic, audioEvent };
