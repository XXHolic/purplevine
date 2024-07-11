import axios from "../asset/js/axios.min.js";
import { api } from "./api.js";
import { spin, info, showTrigger, addEventOnce } from "./util.js";

const eventInit = () => {};
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
          accS += `<div class="lmp-singer-name lmp-cursor-pointer" data-id=${singerId} data-name=${singerName}>${singerName}</div>`;
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
};

export { singerInit };
