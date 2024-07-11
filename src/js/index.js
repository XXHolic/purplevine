import { sheetInit } from "./sheet.js";
import { singerInit } from "./singer.js";
import { spin, info, showTrigger } from "./util.js";

const init = () => {
  sheetInit();
  const myEle = document.querySelector(".lmp-my");
  const singerEle = document.querySelector(".lmp-singer");
  const songEle = document.querySelector(".lmp-song");
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
        showTrigger.show(myEle, [songEle, singerEle]);
        break;
      }
      case "singer": {
        sheetMenu.setAttribute("class", "lmp-menu-item");
        singerMenu.setAttribute("class", "lmp-menu-item lmp-menu-active");
        songMenu.setAttribute("class", "lmp-menu-item");
        showTrigger.show(singerEle, [myEle, songEle]);
        singerInit();
        break;
      }
      case "song": {
        sheetMenu.setAttribute("class", "lmp-menu-item");
        singerMenu.setAttribute("class", "lmp-menu-item");
        songMenu.setAttribute("class", "lmp-menu-item lmp-menu-active");
        showTrigger.show(songEle, [myEle, singerEle]);
        break;
      }
    }
  });
};

export { init };
