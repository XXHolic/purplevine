import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, rename, mkdirSync } from "node:fs";
import { basename, dirname, resolve, join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { createSingerAllSong } from './generateSingerSong.mjs';
import { formatSingersData } from './formatSinger.mjs';

const targetSingerId = 59;
const targetSingerName = '张震岳';
const startNum = 440;

// 这个是针对 pm2 启动时无法找到路径的问题
const fileName = fileURLToPath(import.meta.url);
const currentFold = dirname(fileName);
const preFold = resolve(currentFold, '..');
const dir = `../localdata/${targetSingerId}`;

const fileArr = [];
const getFilePath = () => {
  const exist = existsSync(dir);
  // 排除不需要遍历的文件夹或文件
  const excludeDir = /^(\.|node_module)/;
  const numTest = /^[0-9]*$/;
  if (!exist) {
    console.error("目录路径不存在");
    return;
  }
  const pa = readdirSync(dir);

  for (let index = 0; index < pa.length; index++) {
    let file = pa[index];
    const pathName = join(dir, file);
    const info = statSync(pathName);
    if (info.isDirectory() && !excludeDir.test(file)) {
      // getFilePath(pathName);
      return;
    } else {
      const fileName = basename(file);
      const name = fileName.split('.').pop();
      const isRightType = [".flac", ".mp3"].includes(extname(file));
      const isRightName = !numTest.test(name);
      // 整理过后的文件都是数字命名的，所以后续加入的新歌曲就要排除之前已经存在的歌曲
      if (isRightType && isRightName) {
        fileArr.push(pathName);
      }
    }
  }
};

/**
 *
 * @param start 生成文件序号的开始
 * @param end 生成文件序号的结束,暂时不需要
 */
const createData = (start) => {
  const len = fileArr.length;
  for (let index = 0; index < len; index++) {
    const pathStr = fileArr[index];
    const songId = start + index;
    const objDemo = { songId: songId, songName: "", singerId: targetSingerId, singerName: targetSingerName, playCount: 0, type: "flac", src: "", lrc: "" };
    const fileName = basename(pathStr);
    const splitArr = fileName.split('.');
    const name = splitArr[0], type = splitArr[1];
    objDemo.songName = name;
    objDemo.type = type;
    const newName = index + 1;
    objDemo.src = `${newName}.${type}`;
    objDemo.lrc = `${newName}.lrc`;
    const newPathName = `${dir}/${newName}.${type}`;
    const oldLrcPathName = `${dir}/${name}.lrc`;
    const newLrcPathName = `${dir}/${newName}.lrc`;
    rename(pathStr, newPathName, (err) => {
      if (err) {
        console.log(err);
        console.log('音乐文件重命名失败');
      }
    });
    rename(oldLrcPathName, newLrcPathName, (err) => {
      if (err) {
        console.log(err);
        console.log('歌词文件重命名失败')
      }
    });
    const foldPath = `../localdatajson/${targetSingerId}`;
    if (!existsSync(foldPath)) {
      mkdirSync(foldPath);
    }
    const writePath = `${preFold}/localdatajson/${targetSingerId}/song${songId}.json`;
    writeFileSync(writePath, JSON.stringify(objDemo));
    console.log(`${name} 歌曲 ${songId}.json 生成`);
    // 记录最后一个生成文件的数字，方便下一次查找使用
    if (index == len - 1) {
      const maxNumPath = `./createMaxNum.json`;
      writeFileSync(maxNumPath, JSON.stringify({ maxNum: songId }));
    }
  }

};

// 处理旧文件的方法，后面用不到了，留着做代码参考
const moveFile = () => {
  const foldPath = `../localdatajson/${targetSingerId}`;
  if (!existsSync(foldPath)) {
    mkdirSync(foldPath);
  }
  const filePath = "./songsPath.json";
  const fileContent = readFileSync(filePath, { encoding: "utf-8" });
  const fileArr = JSON.parse(fileContent);
  let len = fileArr.length;
  let count = 0;
  for (let num = 0; num < len; num++) {
    const pathStr = fileArr[num];
    const fileName = basename(pathStr);
    const content = readFileSync(pathStr, { encoding: "utf-8" });
    const contentsObj = JSON.parse(content);
    const { songId, songName, singerId } = contentsObj;
    if (singerId == targetSingerId) {
      const writePath = `${foldPath}/${fileName}`;
      writeFileSync(writePath, content);
      count = count + 1;
    }
  }
  console.log(`${targetSingerId} 号歌手共 ${count} 首歌曲集合完成`);
}

getFilePath();
createData(startNum);
const endNum = startNum + fileArr.length - 1;
createSingerAllSong(targetSingerId, startNum, endNum);
formatSingersData();


