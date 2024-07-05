// 歌单：
// - 所有列表：/api/sheet
// - 新增：/api/sheet/add
// - 重命名：/api/sheet/edit
// - 删除：/api/sheet/del
// - 排序：/api/sheet/sort
// - 单个歌单详情：/api/sheet/detail
// - 单个歌单内歌曲排序：/api/sheet/detail/sort
// - 单个歌单内歌曲删除：/api/sheet/detail/del

// 歌手：
// - 所有列表：/api/singer
// - 单个歌手前 50 热度歌曲：/api/singer/music

// 歌曲：
// - 列表：/api/music
// - 所有歌曲公用转移到歌单：/api/music/move，通过传参区分是单独收藏还是从一个歌单转移到另外一个歌单
import {
  sheetList,
  sheetAdd,
  sheetEdit,
  sheetDele,
  sheetSort,
  sheetDetail,
  sheetDetailSort,
} from "./sheet.mjs";


const api = {
  sheet: "/api/sheet",
  sheetAdd: "/api/sheet/add",
  sheetEdit: "/api/sheet/edit",
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

const route = (req,res) => {
  console.log("About to route a request for " + req.url);
  const {url} = req
  switch (url) {
    case api.sheet: {
      sheetList(res);
      break;
    }
    case api.sheetAdd: {
      sheetAdd(req, res);
      break;
    }
    case api.sheetEdit: {
      sheetEdit(req, res);
      break;
    }
    case api.sheetDel: {
      sheetDele(req, res);
      break;
    }
    case api.sheetSort: {
      sheetSort(req, res);
      break;
    }
    case api.sheetDetail: {
      sheetDetail(req, res);
      break;
    }
    case api.sheetDetailSort: {
      sheetDetailSort(req, res);
      break;
    }
    default: {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end("No Match Url");
    }
  }

};

export { route };