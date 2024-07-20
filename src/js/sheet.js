import axios from "../asset/js/axios.min.js";
import Sortable from '../asset/js/sortable.esm.js';
import { api } from "./api.js";
import { getSingerSelf, singerSelfEvent } from "./singer.js";
import { getMusic, audioEvent } from "./player.js";
import { spin, info, showTrigger, addEventOnce } from "./util.js";

let allListOrigin = []; // 主要用来判断 新建和修改时 是否重名

const getSheetList = () => {
  return axios.get(api.sheet).then((response) => {
    const { data, status } = response;
    if (status === 200) {
      allListOrigin = data;
      const listStr = data.reduce((acc, cur, index) => {
        const { listId, listName } = cur;
        const isDefault = listId == 1; // 默认的不能操作和删除
        const editClassName = isDefault
          ? "lmp-sheet-default"
          : "lmp-sheet-edit lmp-cursor-pointer";
        const deleClassName = isDefault
          ? "lmp-sheet-default"
          : "lmp-sheet-dele lmp-cursor-pointer";
        const rowCls = index % 2 ? "" : "lmp-sheet-odd";
        acc += `<div class="lmp-sheet-row ${rowCls}" data-id=${listId} data-name=${listName}>
                  <div class="lmp-sheet-name"><span class="lmp-sheet-desc lmp-cursor-pointer" data-id=${listId} data-name=${listName} data-type="jump">${listName}</span></div>
                  <div class="lmp-sheet-operate">
                  <div class="${editClassName}" title="编辑"><i class="fa-solid fa-pencil fa-lg" data-name=${listName} data-id=${listId} data-type="edit"></i></div>
                    <div class="${deleClassName}" title="删除"><i class="fa-solid fa-trash-can fa-lg" data-id=${listId} data-type="dele"></i></div>
                    <div class="lmp-sheet-drag lmp-cursor-pointer" title="拖动排序"><i class="fa-solid fa-bars fa-lg" data-id=${listId} data-type="sort"></i></div>
                  </div>
                </div>`;
        return acc;
      }, "");

      const sheetListObj = document.querySelector("#sheetList");
      sheetListObj.innerHTML = listStr;
      setTimeout(() => {
        const hasInstance = Sortable.get(sheetListObj);
        if (!hasInstance) {
          Sortable.create(sheetListObj, {
            handle: ".lmp-sheet-drag",
            animation: 150,
            draggable: ".lmp-sheet-row",
            onEnd: (evt) => {
              const newNodeList =
                sheetListObj.querySelectorAll(".lmp-sheet-row");
              const newList = [];
              for (let i = 0; i < newNodeList.length; i++) {
                const listId = Number(newNodeList[i].getAttribute("data-id"));
                const listName = newNodeList[i].getAttribute("data-name");
                newList.push({ listId, listName });
              }
              axios.post(api.sheetSort, newList).then(() => {
                getSheetList();
              });
            },
          });
        }
      }, 1000);
    }
  });
};

const deleSheet = async (params) => {
  if (params.listId == 1) {
    info.err("默认歌单不能删除");
    return;
  }
  if (window.confirm("确定要删除此歌单吗?")) {
    spin.show();
    try {
      const { status } = await axios.post(api.sheetDel, params);
      if (status === 200) {
        info.show();
        getSheetList();
      }
    } catch (error) {
      console.error(error);
    } finally {
      spin.hide();
    }
  }
};

const getSheetDetail = async (params) => {
  spin.show();
  try {
    const { status, data } = await axios.post(api.sheetDetail, params);
    if (status === 200) {
      const { listId, listName, songList } = data;
      const listStr = songList.reduce((acc, cur, index) => {
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
                          <div class="lmp-operate-add lmp-cursor-pointer" title="移动">
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
      const listObj = document.querySelector("#sheetDetailList");
      listObj.innerHTML = listStr;
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
              axios
                .post(api.sheetDetailSort, {
                  listId,
                  newList,
                })
                .then(() => {
                  getSheetDetail(params);
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

const moveSong = (params) => {
  const moveDia = document.querySelector("#songMoveDia");
  const sheetSelect = document.querySelector("#allSheets");
  allListOrigin.map((ele) => {
    const { listId, listName } = ele;
    if (params.listId != listId) {
      sheetSelect.add(new Option(listName, listId));
    }
  });
  moveDia.showModal();

  const diaCancel = document.querySelector("#sheetMoveCancel");
  const diaConfirm = document.querySelector("#sheetMoveConfirm");
  const diaSpin = document.querySelector("#sheetMoveSpin");

  addEventOnce(diaConfirm, "click", (e) => {
    const index = sheetSelect.selectedIndex; //序号，取当前选中选项的序号
    const val = sheetSelect.options[index].value;
    if (params.listId == val) {
      moveDia.close();
      return;
    }
    const postData = {
      songId: params.songId,
      newListId: Number(val),
      oldListId: params.listId,
    };
    diaSpin.style.display = "inline-block";
    diaConfirm.disabled = true;
    axios
      .post(api.sheetDetailMove, postData)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          moveDia.close();
          info.show();
          getSheetDetail(params);
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

const deleSong = async (params) => {
  if (window.confirm("确定要移除此歌曲吗?")) {
    spin.show();
    try {
      const { status } = await axios.post(api.sheetDetailDel, params);
      if (status === 200) {
        info.show();
        getSheetDetail(params);
      }
    } catch (error) {
      console.error(error);
    } finally {
      spin.hide();
    }
  }
};

const sheetDetailEvent = (params) => {
  const { listName, listId } = params;
  const backEle = document.querySelector("#sheetDetailBack");
  const containerEle = document.querySelector("#sheetDetailList");
  const sheetDetailName = document.querySelector("#sheetDetailName");
  sheetDetailName.innerHTML = listName;
  addEventOnce(containerEle, "click", (e) => {
    const ele = e.target;
    const eleType = ele.getAttribute("data-type");
    const eleName = ele.getAttribute("data-name");
    const eleId = Number(ele.getAttribute("data-id"));
    switch (eleType) {
      case "jump": {
        const myEle = document.querySelector(".lmp-my");
        const singerSelf = document.querySelector(".lmp-singer-self");
        showTrigger.show(singerSelf, myEle);
        getSingerSelf({ singerId: eleId });
        singerSelfEvent({
          singerId: eleId,
          singerName: eleName,
          from: "my",
        });
        break;
      }
      case "play": {
        const songName = ele.getAttribute("data-songname");
        const singerId = Number(ele.getAttribute("data-singerid"));
        const singerName = ele.getAttribute("data-singername");
        getMusic({ songId: eleId, songName, singerId, singerName });
        break;
      }
      case "move": {
        moveSong({ songId: eleId, listId: listId, listName: listName });
        break;
      }
      case "dele": {
        deleSong({ songId: eleId, listId: listId, listName: listName });
        break;
      }
    }
  });
  addEventOnce(backEle, "click", (e) => {
    const showEle = document.querySelector("#sheetContainer");
    const hideEle = document.querySelector("#sheetDetailContainer");
    showTrigger.show(showEle, hideEle);
  });
};

const sheetEventInit = () => {
  const sheetListEle = document.querySelector("#sheetList");
  const addBtn = document.querySelector("#sheetAdd");
  const addDiaConfirm = document.querySelector("#sheetAddConfirm");
  const addDia = document.querySelector("#sheetAddDia");
  const addDiaCancel = document.querySelector("#sheetAddCancel");
  const sheetNameObj = document.querySelector("#sheetName");
  const sheetDiaErrObj = document.querySelector("#sheetDiaErr");
  const sheetDiaSpinObj = document.querySelector("#sheetDiaSpin");
  const sheetDiaNameObj = document.querySelector("#sheetDiaName");

  addBtn.addEventListener("click", () => {
    addDia.showModal();
  });

  addDiaConfirm.addEventListener("click", () => {
    const nameValue = sheetNameObj.value;
    const sheetName = nameValue.trim();
    if (!sheetName) {
      sheetDiaErrObj.innerHTML = "必填";
      return;
    }
    if (sheetName.length > 20) {
      sheetDiaErrObj.innerHTML = "名称长度最大 20";
      return;
    }
    const dataType = addDiaConfirm.getAttribute("data-type");
    const dataId = addDiaConfirm.getAttribute("data-id");
    let isRepeat = allListOrigin.find((ele) => ele.listName === sheetName);
    const isEdit = dataType === "edit";
    let apiUse = isEdit ? api.sheetEdit : api.sheetAdd;
    if (isEdit) {
      isRepeat = allListOrigin.find(
        (ele) => ele.listName === sheetName && dataId != ele.listId
      );
      formData.listId = Number(dataId);
    }
    if (isRepeat) {
      info.err("歌单名称已存在");
      return;
    }

    sheetDiaErrObj.innerHTML = "";
    const formData = { listName: sheetName };
    sheetDiaSpinObj.style.display = "inline-block";
    addDiaConfirm.disabled = true;
    axios
      .post(apiUse, formData)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          addDia.close();
          info.show();
          getSheetList();
        }
      })
      .finally(() => {
        sheetDiaSpinObj.style.display = "none";
      });
  });

  addDiaCancel.addEventListener("click", () => {
    addDia.close();
  });

  addDia.addEventListener("close", () => {
    addDiaConfirm.disabled = false;
    addDiaConfirm.setAttribute("data-type", "");
    addDiaConfirm.setAttribute("data-id", "");
    sheetNameObj.value = "";
    sheetDiaErrObj.innerHTML = "";
    sheetDiaNameObj.innerHTML = "新建歌单";
  });

  const editSheet = (params) => {
    addDia.showModal();
    sheetDiaNameObj.innerHTML = "歌单重命名";
    sheetNameObj.value = params.listName;
    // 这个是为了公用新建弹窗，添加标识区分
    addDiaConfirm.setAttribute("data-type", "edit");
    addDiaConfirm.setAttribute("data-id", params.listId);
  };

  sheetListEle.addEventListener("click", (e) => {
    const showEle = document.querySelector("#sheetDetailContainer");
    const hideEle = document.querySelector("#sheetContainer");
    const ele = e.target;
    const eleType = ele.getAttribute("data-type");
    const eleName = ele.getAttribute("data-name");
    const eleId = Number(ele.getAttribute("data-id"));
    const params = { listId: eleId, listName: eleName };
    switch (eleType) {
      case "jump": {
        showTrigger.show(showEle, hideEle);
        getSheetDetail(params);
        sheetDetailEvent(params);
        break;
      }
      case "edit": {
        editSheet(params);
        break;
      }
      case "dele": {
        deleSheet({ listId: eleId });
        break;
      }
    }
  });
};

const sheetInit = () => {
  getSheetList().then(() => {
    setTimeout(() => {
      sheetEventInit();
    }, 500);
  });
};

export { sheetInit, sheetEventInit, getSheetList, allListOrigin };
