import { getSheetList, sheetEventInit } from "./sheet.js";

const init  = () => {
  getSheetList().then(() => {
    setTimeout(() => {
      sheetEventInit();
    }, 500);
  });
  const menuEle = document.querySelector(".lmp-body-left");
  const menuItemEle = document.getElementsByClassName("lmp-menu-item");
  const sheetMenu = menuItemEle[0],
    singerMenu = menuItemEle[1],
    songMenu = menuItemEle[2];
  menuEle.addEventListener("click", (e) => {
    const ele = e.target;
    const eleType = ele.getAttribute("data-type");
    switch (eleType) {
      case "sheet": {
        sheetMenu.setAttribute("class", "lmp-menu-item lmp-menu-active");
        singerMenu.setAttribute("class", "lmp-menu-item");
        songMenu.setAttribute("class", "lmp-menu-item");
        break;
      }
      case "singer": {
        sheetMenu.setAttribute("class", "lmp-menu-item");
        singerMenu.setAttribute("class", "lmp-menu-item lmp-menu-active");
        songMenu.setAttribute("class", "lmp-menu-item");
        break;
      }
      case "song": {
        sheetMenu.setAttribute("class", "lmp-menu-item");
        singerMenu.setAttribute("class", "lmp-menu-item");
        songMenu.setAttribute("class", "lmp-menu-item lmp-menu-active");
        break;
      }
    }
  });
}

export { init };