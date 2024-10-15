import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
// 考虑到后面歌手可能多了，每次都全部解析合并一次没有必要，
// 做成可根据 id 来进行指定拉取合并

const targetSingerId = 49;
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

// 这个是从所有数据中筛选后再集合生成
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
  // 取播放量最多的前 50 首
  const writeContent = songs.slice(0, 50);
  const writePath = `${preFold}/json/singer${params}.json`;
  writeFileSync(writePath, JSON.stringify(writeContent));
  console.log(`${targetSingerId}号歌手歌曲整理完成`);
};

// 这个是指定对应文件，直接集合生成。大多数整理的时候是连续的文件序号，所以可以利用循环指定序号范围
/**
 *
 * @param start 文件序号的开始
 * @param end 文件序号的结束
 * @param extra 如果不是顺序的文件，就手动添加进来
 */
const createSingerAllSong = (singerId, start, end, extra = []) => {
  let fileArr = [];
  for (let index = start; index <= end; index++) {
    // 路径的生成默认是Windows 平台的，如果在其它平台报错的话，注意进行调整
    const pathStr = `..\\localdatajson\\${singerId}\\song${index}.json`;
    fileArr.push(pathStr);
  }
  fileArr = fileArr.concat(extra);
  let len = fileArr.length;
  for (let index = 0; index < len; index++) {
    const content = readFileSync(fileArr[index], { encoding: "utf-8" });
    const contentsObj = JSON.parse(content);
    songs.push(contentsObj);
  }
  dataSort(songs);
  // 取播放量最多的前 50 首
  const writeContent = songs.slice(0, 50);
  const writePath = `${preFold}/json/singer${singerId}.json`;
  writeFileSync(writePath, JSON.stringify(writeContent));
  console.log(`${singerId}号歌手歌曲整理完成`);
};

// getData(targetSingerId);
// createSingerAllSong(targetSingerId, 389, 389);

export { createSingerAllSong }

