import axios from "../asset/js/axios.min.js";
import { api } from "./api.js";
import { spin, info, showTrigger, addEventOnce } from "./util.js";

const getList = async (params) => {
  spin.show();
  try {
    const { status, data } = await axios.post(api.music, params);
    if (status === 200) {
      const { list, total, pageSize, page } = data;
      const listStr = list.reduce((acc, cur, index) => {
        const { singerId, singerName, songId, songName } = cur;
        const rowCls = index % 2 ? "" : "lmp-song-odd";
        acc += `<div class="lmp-song-row ${rowCls}">
                  <div class="lmp-song-name">${songName}</div>
                  <div class="lmp-song-singer">
                    <span class="lmp-song-span lmp-cursor-pointer" data-singerid=${singerId} data-singername=${singerName} data-type="jump">${singerName}</span>
                  </div>
                  <div class="lmp-song-operate">
                    <div class="lmp-operate-play lmp-cursor-pointer" title="播放">
                      <i class="fa-regular fa-circle-play fa-lg" data-singerid=${singerId} data-singername=${singerName} data-songid=${songId} data-songname=${songName}  data-type="play"></i>
                    </div>
                    <div class="lmp-operate-add lmp-cursor-pointer" title="收藏到歌单">
                      <i class="fa-solid fa-folder fa-lg" data-singerid=${singerId} data-singername=${singerName} data-songid=${songId} data-songname=${songName} data-type="collect"></i>
                    </div>
                  </div>
                </div>`;
        return acc;
      }, "");
      const musicTotalObj = document.querySelector("#musicTotal");
      const listObj = document.querySelector("#musicList");
      const musicPageObj = document.querySelector("#musicPage");
      musicTotalObj.innerHTML = total;
      listObj.innerHTML = listStr;

      const pageCount = Math.round(total / pageSize);
      let pageStr = "";
      for (let index = 0; index < pageCount; index++) {
        const pageNum = index + 1;
        const cls = pageNum == page ? "lmp-song-num active" : "lmp-song-num";
        pageStr += `<div class="${cls}" data-page=${pageNum}>${pageNum}</div>`;
      }
      musicPageObj.innerHTML = pageStr;
    }
  } catch (error) {
    console.error(error);
  } finally {
    spin.hide();
  }
};

const eventInit = () => {
  const listObj = document.querySelector("#musicList");
  const musicPageObj = document.querySelector("#musicPage");

  addEventOnce(listObj, "click", (e) => {});
  addEventOnce(musicPageObj, "click", (e) => {
    const ele = e.target;
    const page = Number(ele.getAttribute("data-page"));
    const cls = ele.getAttribute("class");
    if (cls.indexOf("active") > -1) {
      info.show("已在当前页");
      return;
    }
    getList({ page });
  });
};

const songInit = () => {
  const music = document.querySelector("#musicList");
  if (music.hasChildNodes()) {
    return;
  }
  getList({ page: 1 });
  eventInit();
};

export { songInit };
