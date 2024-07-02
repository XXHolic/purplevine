import axios from "../asset/js/axios.min.js";
import Sortable from '../asset/js/sortable.esm.js';
import { api } from "./api.js";
import { spin, info } from "./util.js";

const getSheetList = () => {
  return axios.get(api.sheet).then((response) => {
    const { data, status } = response;
    if (status === 200) {
      const listStr = data.reduce((acc, cur, index) => {
        const { listId, listName } = cur;
        const rowCls = index % 2 ? "" : "lmp-sheet-odd";
        acc += `<div class="lmp-sheet-row ${rowCls}" data-id=${listId} data-name=${listName}>
                  <div class="lmp-sheet-name"><span class="lmp-sheet-desc lmp-cursor-pointer" data-id=${listId} data-type="jump">${listName}</span></div>
                  <div class="lmp-sheet-operate">
                    <div class="lmp-sheet-dele lmp-cursor-pointer" title="删除"><i class="fa-solid fa-trash-can fa-lg" data-id=${listId} data-type="dele"></i></div>
                    <div class="lmp-sheet-drag lmp-cursor-pointer" title="排序"><i class="fa-solid fa-bars fa-lg" data-id=${listId} data-type="sort"></i></div>
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
      },1000)
    }
  });
}

const deleSheet = async (params) => {
  if (params.listId == 1) {
    info.err('默认歌单不能删除');
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
}

const sheetEventInit = () => {
  const sheetListEle = document.querySelector("#sheetList");
  const addBtn = document.querySelector("#sheetAdd");
  const addDiaConfirm = document.querySelector("#sheetAddConfirm");
  const addDia = document.querySelector("#sheetAddDia");
  const addDiaCancel = document.querySelector("#sheetAddCancel");
  const sheetNameObj = document.querySelector("#sheetName");
  const sheetDiaErrObj = document.querySelector("#sheetDiaErr");
  const sheetDiaSpinObj = document.querySelector("#sheetDiaSpin");

  addBtn.addEventListener("click", () => {
    addDia.showModal();
  });

  addDiaConfirm.addEventListener("click", () => {
    const sheetName = sheetNameObj.value;
    if (!sheetName) {
      sheetDiaErrObj.innerHTML="必填";
      return;
    }
    if (sheetName.length > 20) {
      sheetDiaErrObj.innerHTML="名称长度最大 20";
      return;
    }
    sheetDiaErrObj.innerHTML = '';
    const formData = { listName: sheetName };
    sheetDiaSpinObj.style.display = 'inline-block';
    addDiaConfirm.disabled = true;
    axios
      .post(api.sheetAdd, formData)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          addDiaConfirm.disabled = false;
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
    sheetNameObj.value = "";
    sheetDiaErrObj.innerHTML = "";
  });

  sheetListEle.addEventListener('click', (e) => {
    const ele = e.target
    const eleType = ele.getAttribute('data-type');
    const eleId = ele.getAttribute('data-id');
    switch(eleType) {
      case 'jump':{
        break;
      }
      case 'dele':{
        deleSheet({ listId: eleId });
        break;
      }
      case 'sort':{
        break;
      }
    }
  });
};

export { sheetEventInit, getSheetList };
