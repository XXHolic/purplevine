import { readFileSync, writeFileSync } from "node:fs";

const getData = () => {
  const filePath = "./songsPath.json";
  const fileContent = readFileSync(filePath, { encoding: "utf-8" });
  const fileArr = JSON.parse(fileContent);
  let len = fileArr.length;
  const singers = [];
  const idArr = [];
  for (let index = 0; index < len; index++) {
    const content = readFileSync(fileArr[index], { encoding: "utf-8" });
    const contentsObj = JSON.parse(content);
    const { songId, songName, singerId, singerName, playCount } = contentsObj;
    if (!idArr.includes(singerId)) {
      singers.push({ singerId, singerName });
      idArr.push(singerId);
    }
  }
  const writePath = "../json/singers.json";
  writeFileSync(writePath, JSON.stringify(singers));
  console.log("所有歌手文件生成成功");
};

getData();
