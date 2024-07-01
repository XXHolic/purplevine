import axios from "../asset/js/axios.min.js";
import { api } from "./api.js";

const getSheetList = () => {
  return axios.get(api.sheet).then((response) => {
    const { data, status } = response;
    if (status === 200) {
      const listStr = data.reduce((acc, cur, index) => {
        const { listId, listName } = cur;
        const rowCls = index % 2 ? "" : "lmp-sheet-odd";
        acc += `<div class="lmp-sheet-row ${rowCls}">
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
    }
  });
}

const deleSheet = async (params) => {
  try {
    const { status } = await axios.post(api.sheetDel, params);
    if (status === 200) {
      getSheetList();
    }

  } catch (error) {
    console.error(error)
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
    addDiaConfirm.setAttribute("disabled", true);
    axios
      .post(api.sheetAdd, formData)
      .then(function (response) {
        const { status } = response;
        if (status === 200) {
          addDia.close();
          getSheetList();
        }
      })
      .finally(() => {
        sheetDiaSpinObj.style.display = "none";
        addDiaConfirm.setAttribute("disabled", false);
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
    console.log('eleType',eleType)
    switch(eleType) {
      case 'jump':{
        break;
      }
      case 'dele':{
        deleSheet({ listId: eleId });
        break;
      }
      case 'sory':{
        break;
      }
    }
  });
};

export { sheetEventInit, getSheetList };
