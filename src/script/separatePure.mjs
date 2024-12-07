import { readFileSync, writeFileSync } from "node:fs";

// 正对纯音乐的分割文件
const separateData = () => {
  const filePath = "./songsPurePath.json";
  const fileContent = readFileSync(filePath, { encoding: "utf-8" });
  const fileArr = JSON.parse(fileContent);
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
      music.push({ songId, songName, singerId, singerName, tags });
    }
    const fileId = num + 1;
    const writePath = `../json/pure${fileId}.json`;
    const fileContent = {
      total: len,
      page: fileId,
      pageSize: pageSize, // 这个固定
      list: music,
    };
    writeFileSync(writePath, JSON.stringify(fileContent));
    console.log(`纯音乐合集文件pure${fileId}生成成功`);
    music = [];
  }
};

separateData();
