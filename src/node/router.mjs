// 歌单：
// - 所有列表：/api/sheet
// - 新增：/api/sheet/add
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

const apiList = {
  sheet: '/api/sheet',
  sheetAdd: '/api/sheet/add',
  sheetDel: '/api/sheet/del',
  sheetSort: '/api/sheet/sort',
  sheetDetail: '/api/sheet/detail',
  sheetDetailSort: '/api/sheet/detail/sort',
  sheetDetailDel: '/api/sheet/detail/del',
  singer: '/api/singer',
  singerMusic: '/api/sheet/music',
  music: '/api/music',
  musicMove: '/api/music/move',
}

const route = (req) => {
  console.log("About to route a request for " + req.url);
  const {url} = req
  switch (url) {
    case apiList.sheet : {

    }
  }

};

export { route };