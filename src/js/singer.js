import axios from "../asset/js/axios.min.js";
import { api } from "./api.js";
import { allListOrigin } from "./sheet.js";
import { getMusic, addCurrentPlayList } from "./player.js";
import { spin, info, showTrigger, addEventOnce } from "./util.js";

const getSingerSelf = async (params) => {
  spin.show();
  try {
    const { status, data } = await axios.post(api.singerMusic, params);
    if (status === 200) {
      const listStr = data.reduce((acc, cur, index) => {
        const { singerId, singerName, songId, songName } = cur;
        const rowCls = index % 2 ? "" : "lmp-song-odd";
        acc += `<div class="lmp-song-row ${rowCls}" data-songid="${songId}" data-songname="${songName}">
                  <div class="lmp-song-name">${songName}</div>
                  <div class="lmp-song-operate">
                    <div class="lmp-operate-play lmp-cursor-pointer" title="播放">
                      <i class="fa-regular fa-circle-play fa-lg" data-singerid="${singerId}" data-singername="${singerName}" data-songid="${songId}" data-songname="${songName}"  data-type="play"></i>
                    </div>
                    <div class="lmp-operate-play lmp-cursor-pointer" title="加入播放列表">
                      <i class="fa-solid fa-plus fa-lg" data-singerid="${singerId}" data-singername="${singerName}" data-songid="${songId}" data-songname="${songName}"  data-type="add"></i>
                    </div>
                    <div class="lmp-operate-add lmp-cursor-pointer" title="收藏到歌单">
                      <i class="fa-solid fa-folder fa-lg" data-singerid="${singerId}" data-singername="${singerName}" data-songid="${songId}" data-songname="${songName}" data-type="collect"></i>
                    </div>
                  </div>
                </div>`;
        return acc;
      }, "");
      const listObj = document.querySelector("#singerSelfList");
      listObj.innerHTML = listStr;
    }
  } catch (error) {
    console.error(error);
  } finally {
    spin.hide();
  }
};

const collectSong = (params) => {
  const moveDia = document.querySelector("#songMoveDia");
  const sheetSelect = document.querySelector("#allSheets");
  allListOrigin.map((ele) => {
    const { listId, listName } = ele;
    sheetSelect.add(new Option(listName, listId));
  });
  moveDia.showModal();

  const diaCancel = document.querySelector("#sheetMoveCancel");
  const diaConfirm = document.querySelector("#sheetMoveConfirm");
  const diaSpin = document.querySelector("#sheetMoveSpin");

  addEventOnce(diaConfirm, "click", (e) => {
    const index = sheetSelect.selectedIndex; //序号，取当前选中选项的序号
    const val = sheetSelect.options[index].value;
    const postData = {
      songMsg: params,
      listId: Number(val),
    };
    diaSpin.style.display = "inline-block";
    diaConfirm.disabled = true;
    axios
      .post(api.collect, postData)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          moveDia.close();
          info.show();
        }
      })
      .finally(() => {
        diaSpin.style.display = "none";
      });
  });

  addEventOnce(diaCancel, "click", (e) => {
    moveDia.close();
  });

  addEventOnce(moveDia, "close", (e) => {
    diaConfirm.disabled = false;
    sheetSelect.options.length = 0;
  });
};

const singerSelfEvent = (params) => {
  const { singerId, singerName, from } = params;
  const singerSelfBack = document.querySelector("#singerSelfBack");
  const singerSelfName = document.querySelector("#singerSelfName");
  const singerSelfPlayAll = document.querySelector("#singerSelfPlayAll");
  const singerSelfList = document.querySelector("#singerSelfList");

  singerSelfName.innerHTML = singerName;
  addEventOnce(singerSelfList, "click", (e) => {
    const ele = e.target;
    const eleType = ele.getAttribute("data-type");
    const songName = ele.getAttribute("data-songname");
    const songId = Number(ele.getAttribute("data-songid"));
    switch (eleType) {
      case "play": {
        getMusic({ songId, songName, singerId, singerName });
        break;
      }
      case "add": {
        addCurrentPlayList({ songId, songName, singerId, singerName });
        break;
      }
      case "collect": {
        collectSong({ songId, songName, singerId, singerName });
        break;
      }
    }
  });
  addEventOnce(singerSelfBack, "click", (e) => {
    const hideEle = document.querySelector(".lmp-singer-self");
    switch (from) {
      case "my": {
        const showEle = document.querySelector(".lmp-my");
        showTrigger.show(showEle, hideEle);
        break;
      }
      case "singer": {
        const showEle = document.querySelector(".lmp-singer");
        showTrigger.show(showEle, hideEle);
        break;
      }
      case "song": {
        const showEle = document.querySelector(".lmp-song");
        showTrigger.show(showEle, hideEle);
        break;
      }
    }
  });
  addEventOnce(singerSelfPlayAll, "click", (e) => {
    const firstRow = singerSelfList.querySelector(".lmp-song-row");
    const songId = Number(firstRow.getAttribute("data-songid"));
    const songName = firstRow.getAttribute("data-songname");
    getMusic({ songId, songName, singerId, singerName }, { needUpdate: false });
    addCurrentPlayList({ isPlayAll: true, singerId });
  });
};

// 展示结构：
// <div class="lmp-singer-row">
//   <div>A</div>
//   <div class="lmp-singer-list">
//     <div class="lmp-singer-name lmp-cursor-pointer">歌手 1</div>
//     <div class="lmp-singer-name lmp-cursor-pointer">歌手 2</div>
//     <div class="lmp-singer-name lmp-cursor-pointer">歌手 3</div>
//   </div>
// </div>;
const singerInit = () => {
  const singerBody = document.querySelector(".lmp-singer");
  const singerSelf = document.querySelector(".lmp-singer-self");
  if (singerBody.hasChildNodes()) {
    return;
  }
  axios.get(api.singer).then((response) => {
    const { data, status } = response;
    if (status === 200) {
      const objKeys = Object.keys(data);
      const objKeysSort = objKeys.sort();
      const str = objKeysSort.reduce((acc, cur) => {
        const target = data[cur];

        const listStr = target.reduce((accS, curS) => {
          const { singerId, singerName } = curS;
          accS += `<div class="lmp-singer-name lmp-cursor-pointer" data-id="${singerId}" data-name="${singerName}">${singerName}</div>`;
          return accS;
        }, "");

        acc += `<div class="lmp-singer-row">
                  <div>${cur.toLocaleUpperCase()}</div>
                  <div class="lmp-singer-list">${listStr}</div>
                </div>`;
        return acc;
      }, "");
      singerBody.innerHTML = str;
    }
  });

  singerBody.addEventListener("click", (e) => {
    const ele = e.target;
    const eleName = ele.getAttribute("data-name");
    const eleId = Number(ele.getAttribute("data-id"));
    if (eleId) {
      showTrigger.show(singerSelf, singerBody);
      getSingerSelf({ singerId: eleId });
      singerSelfEvent({ singerId: eleId, singerName: eleName, from: "singer" });
    }
  });
};

export { singerInit, collectSong, getSingerSelf, singerSelfEvent };
