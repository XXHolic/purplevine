import axios from '../asset/js/axios.min.js';

const apiList = {
  sheet: "/api/sheet",
  sheetAdd: "/api/sheet/add",
  sheetDel: "/api/sheet/del",
  sheetSort: "/api/sheet/sort",
  sheetDetail: "/api/sheet/detail",
  sheetDetailSort: "/api/sheet/detail/sort",
  sheetDetailDel: "/api/sheet/detail/del",
  singer: "/api/singer",
  singerMusic: "/api/sheet/music",
  music: "/api/music",
  musicMove: "/api/music/move",
};

const init  = () => {
  axios.get(apiList.sheet).then(function (response) {
    // 处理成功情况
    console.log(response);
  });
}

export { init };