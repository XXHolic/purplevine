import { readFileSync, writeFileSync } from "node:fs";

// 所有歌曲分割文件，顺便提取纯音乐文件的路径
const separateData = () => {
  const filePath = "./songsPath.json";
  const fileContent = readFileSync(filePath, { encoding: "utf-8" });
  const fileArr = JSON.parse(fileContent);
  let purePath = []; // 记录纯音乐的文件路径
  let len = fileArr.length;
  let music = [];
  const pageSize = 100;
  const count = Math.ceil(len / pageSize);
  const countUse = count ? count : 1;
  for (let num = 0; num < countUse; num++) {
    const sliceArr = fileArr.slice(num * pageSize, num * pageSize + pageSize);
    const sliceArrLen = sliceArr.length;
    for (let index = 0; index < sliceArrLen; index++) {
      const filePath = sliceArr[index];
      const content = readFileSync(filePath, { encoding: "utf-8" });
      const contentsObj = JSON.parse(content);
      const { songId, songName, singerId, singerName, tags = [], playCount } = contentsObj;
      // 判断是否是纯音乐
      if (tags.length && tags.includes(1)) {
        purePath.push(filePath);
      }
      music.push({ songId, songName, singerId, singerName, tags });
    }
    const fileId = num + 1;
    const writePath = `../json/music${fileId}.json`;
    const fileContent = {
      total: len,
      page: fileId,
      pageSize: pageSize, // 这个固定
      list: music,
    };
    writeFileSync(writePath, JSON.stringify(fileContent));
    console.log(`歌曲合集文件music${fileId}生成成功`);
    music = [];
  }
  // 最后写入纯音乐的记录文件
  writeFileSync('./songsPurePath.json', JSON.stringify(purePath));
};

separateData();
