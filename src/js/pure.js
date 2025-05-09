import axios from "../asset/js/axios.min.js";
import { api } from "./api.js";
import { collectSong, getSingerSelf, singerSelfEvent } from "./singer.js";
import { spin, info, showTrigger, addEventOnce } from "./util.js";
import { getMusic, addCurrentPlayList } from "./player.js";

const typeArr = [
  {
    id: 1,
    text: '全部'
  },
  {
    id: 2,
    text: '怀旧'
  },
  {
    id: 3,
    text: '清新'
  },
  {
    id: 4,
    text: '浪漫'
  },
  {
    id: 5,
    text: '伤感'
  },
  {
    id: 6,
    text: '治愈'
  },
  {
    id: 7,
    text: '放松'
  },
  {
    id: 8,
    text: '孤独'
  },
  {
    id: 9,
    text: '感动'
  },
  {
    id: 10,
    text: '兴奋'
  },
  {
    id: 11,
    text: '快乐'
  },
  {
    id: 12,
    text: '安静'
  },
  {
    id: 13,
    text: '思念'
  },
];

const getList = async (params) => {
  spin.show();
  try {
    const { status, data } = await axios.post(api.pure, params);
    if (status === 200) {
      const { list, total, pageSize, page } = data;
      const listStr = list.reduce((acc, cur, index) => {
        const { singerId, singerName, songId, songName } = cur;
        const rowCls = index % 2 ? "" : "lmp-song-odd";
        acc += `<div class="lmp-song-row ${rowCls}">
                  <div class="lmp-song-name" title="${songName}">${songName}</div>
                  <div class="lmp-song-singer">
                    <span class="lmp-song-span lmp-cursor-pointer" data-singerid="${singerId}" data-singername="${singerName}" data-type="jump">${singerName}</span>
                  </div>
                  <div class="lmp-song-operate">
                    <div class="lmp-operate-play lmp-cursor-pointer" title="播放">
                      <i class="fa-regular fa-circle-play fa-lg" data-singerid="${singerId}" data-singername="${singerName}" data-songid="${songId}" data-songname="${songName}" data-type="play"></i>
                    </div>
                    <div class="lmp-operate-play lmp-cursor-pointer" title="加入播放列表">
                      <i class="fa-solid fa-plus fa-lg" data-singerid=${singerId} data-singername="${singerName}" data-songid=${songId} data-songname="${songName}"  data-type="add"></i>
                    </div>
                    <div class="lmp-operate-add lmp-cursor-pointer" title="收藏到歌单">
                      <i class="fa-solid fa-folder fa-lg" data-singerid=${singerId} data-singername="${singerName}" data-songid=${songId} data-songname="${songName}" data-type="collect"></i>
                    </div>
                  </div>
                </div>`;
        return acc;
      }, "");
      const musicTotalObj = document.querySelector("#pureTotal");
      const listObj = document.querySelector("#pureList");
      const musicPageObj = document.querySelector("#purePage");
      musicTotalObj.innerHTML = total;
      listObj.innerHTML = listStr ? listStr : "暂无匹配数据";
      // 分页缓存了滚动的位置，这里重置一下
      setTimeout(() => {
        listObj.scrollTop = 0;
      }, 800)
      // 搜索只取前 100 结果，不进行分页
      if (params.tag) {
        musicPageObj.innerHTML = '';
        return;
      }
      const pageCount = Math.ceil(total / pageSize);
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

const searchInit = () => {
  const typeArrStr = typeArr.reduce((acc, cur, index) => {
    const { id, text } = cur;
    const rowCls = id === 1 ? "lmp-pure-type active" : "lmp-pure-type";
    acc += `<div class="${rowCls}" data-id="${id}">${text}</div>`;
    return acc;
  }, "");
  const pureSearch = document.querySelector("#pureSearch");
  pureSearch.innerHTML = typeArrStr;
}

const eventInit = () => {
  const listObj = document.querySelector("#pureList");
  const musicPageObj = document.querySelector("#purePage");
  const songSearch = document.querySelector("#pureSearch");

  addEventOnce(listObj, "click", (e) => {
    const ele = e.target;
    const eleType = ele.getAttribute("data-type");
    const songName = ele.getAttribute("data-songname");
    const songId = Number(ele.getAttribute("data-songid"));
    const singerName = ele.getAttribute("data-singername");
    const singerId = Number(ele.getAttribute("data-singerid"));
    switch (eleType) {
      case "jump": {
        const songEle = document.querySelector(".lmp-song");
        const singerSelf = document.querySelector(".lmp-singer-self");
        showTrigger.show(singerSelf, songEle);
        getSingerSelf({ singerId: singerId });
        singerSelfEvent({
          singerId: singerId,
          singerName: singerName,
          from: "song",
        });
        break;
      }
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
  addEventOnce(songSearch, "click", (e) => {
    const ele = e.target;
    const tag = ele.getAttribute("data-id");
    if (!tag) {
      return;
    }
    const cls = ele.getAttribute("class");
    if (cls.indexOf('active') > -1) {
      return;
    }
    const currentTag = songSearch.querySelector('.lmp-pure-type.active');
    currentTag.setAttribute("class", "lmp-pure-type");
    ele.setAttribute("class", "lmp-pure-type active");
    if (tag == 1) {
      getList({ page: 1 });
    } else {
      getList({ tag });
    }
  });
};

const pureInit = () => {
  searchInit();
  const music = document.querySelector("#pureList");
  if (music.hasChildNodes()) {
    return;
  }
  getList({ page: 1 });
  eventInit();
};

export { pureInit };
