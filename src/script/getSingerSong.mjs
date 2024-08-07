import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
// 考虑到后面歌手可能多了，每次都全部解析合并一次没有必要，
// 做成可根据 id 来进行指定拉取合并

const targetSingerId = 3;
const songs = [];

// 按照播放次数从多到少排序
const dataSort = (arr) => {
  // console.log("初始数组：", arr); // 5,4,3,2,1
  const len = arr.length;
  //一次次遍历，有多少个数就遍历多少次
  for (let i = 0; i < len; i++) {
    //循环两两比较数组中的数字
    for (let j = 0; j < len; j++) {
      const ele1 = arr[j],
        ele2 = arr[j + 1];
      //if判断，如果数组中的当前一个比后一个大，那么两个交换一下位置
      if (ele1 && ele2 && ele1.playCount < ele2.playCount) {
        var tmp = { ...arr[j] };
        arr[j] = { ...arr[j + 1] };
        arr[j + 1] = tmp;
        // console.log("i=" + i, arr);
      }
    }
  }
};

// 这个是针对 pm2 启动时无法找到路径的问题
const fileName = fileURLToPath(import.meta.url);
const currentFold = dirname(fileName);
const preFold = resolve(currentFold, '..');

const getData = (params) => {
  const filePath = `${currentFold}/songsPath.json`;
  const fileContent = readFileSync(filePath, { encoding: "utf-8" });
  const fileArr = JSON.parse(fileContent);
  let len = fileArr.length;
  for (let index = 0; index < len; index++) {
    const content = readFileSync(fileArr[index], { encoding: "utf-8" });
    const contentsObj = JSON.parse(content);
    const { songId, songName, singerId, singerName, playCount } = contentsObj;
    if (singerId === params) {
      songs.push({ ...contentsObj });
    }
  }
  dataSort(songs);
  // 取播放量最多的前 30 首
  const writeContent = songs.slice(0, 30);
  const writePath = `${preFold}/json/singer${params}.json`;
  writeFileSync(writePath, JSON.stringify(writeContent));
  console.log("歌手对应所有歌曲文件生成成功");
};

const sortSingerSong = ({ songId, singerId }) => {
  const filePath = `${preFold}/json/singer${singerId}.json`;
  const fileContent = readFileSync(filePath, { encoding: "utf-8" });
  const fileArr = JSON.parse(fileContent);
  const playTarget = fileArr.find(ele => ele.songId == songId);
  playTarget.playCount = playTarget.playCount + 1;
  dataSort(fileArr);
  writeFileSync(filePath, JSON.stringify(fileArr));
  console.log("歌手对应歌曲排序结束");
};

getData(targetSingerId);

export { sortSingerSong };
