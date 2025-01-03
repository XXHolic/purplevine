import { sheetInit } from "./sheet.js";
import { singerInit } from "./singer.js";
import { songInit } from "./song.js";
import { pureInit } from "./pure.js";
import { audioEvent } from "./player.js";
import { showTrigger } from "./util.js";

const init = () => {
  sheetInit();
  audioEvent();
  const myEle = document.querySelector(".lmp-my");
  const singerEle = document.querySelector(".lmp-singer");
  const singerSelfEle = document.querySelector(".lmp-singer-self");
  const songEle = document.querySelector(".lmp-song");
  const pureEle = document.querySelector(".lmp-pure");
  const menuEle = document.querySelector(".lmp-body-left");
  const menuItemEle = document.getElementsByClassName("lmp-menu-item");
  const sheetMenu = menuItemEle[0],
    singerMenu = menuItemEle[1],
    songMenu = menuItemEle[2],
    pureMenu = menuItemEle[3];
  menuEle.addEventListener("click", (e) => {
    const ele = e.target;
    const eleType = ele.getAttribute("data-type");
    switch (eleType) {
      case "sheet": {
        sheetMenu.setAttribute("class", "lmp-menu-item lmp-menu-active");
        singerMenu.setAttribute("class", "lmp-menu-item");
        songMenu.setAttribute("class", "lmp-menu-item");
        pureMenu.setAttribute("class", "lmp-menu-item");
        showTrigger.show(myEle, [songEle, singerEle, singerSelfEle, pureEle]);
        break;
      }
      case "singer": {
        sheetMenu.setAttribute("class", "lmp-menu-item");
        singerMenu.setAttribute("class", "lmp-menu-item lmp-menu-active");
        songMenu.setAttribute("class", "lmp-menu-item");
        pureMenu.setAttribute("class", "lmp-menu-item");
        showTrigger.show(singerEle, [myEle, songEle, singerSelfEle, pureEle]);
        singerInit();
        break;
      }
      case "song": {
        sheetMenu.setAttribute("class", "lmp-menu-item");
        singerMenu.setAttribute("class", "lmp-menu-item");
        songMenu.setAttribute("class", "lmp-menu-item lmp-menu-active");
        pureMenu.setAttribute("class", "lmp-menu-item");
        showTrigger.show(songEle, [myEle, singerEle, singerSelfEle, pureEle]);
        songInit();
        break;
      }
      case "pure": {
        sheetMenu.setAttribute("class", "lmp-menu-item");
        singerMenu.setAttribute("class", "lmp-menu-item");
        songMenu.setAttribute("class", "lmp-menu-item");
        pureMenu.setAttribute("class", "lmp-menu-item lmp-menu-active");
        showTrigger.show(pureEle, [songEle, myEle, singerEle, singerSelfEle]);
        pureInit();
        break;
      }
    }
  });
};

export { init };
