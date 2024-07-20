import { readFile, writeFile, unlink } from "node:fs/promises";
import { mp3Duration } from "../asset/js/mp3Duration.mjs";
import { dealPost, backOkMsg, backErrMsg } from "./util.mjs";

const getMusic = (req, res) => {
  dealPost(req, async (params) => {
    const { page, key } = params;
    if (key) {
      // 先找到总共有多少分割的文件
      const firstFile = `../json/music1.json`;
      const data = await readFile(firstFile, { encoding: "utf-8" });
      const { total, pageSize } = JSON.parse(data);
      const num = Math.round(total / pageSize);
      const len = num ? num : 1;
      let result = [];
      for (let index = 0; index < len; index++) {
        const targetPath = `../json/music${index + 1}.json`;
        const contents = await readFile(targetPath, { encoding: "utf-8" });
        const { list } = JSON.parse(contents);
        let arr = list.filter((ele) => {
          const { singerName, songName } = ele;
          const singerHad = singerName.indexOf(key) > -1;
          const songHad = songName.indexOf(key) > -1;
          return singerHad || songHad;
        });
        result = result.concat(arr);
        if (result.length >= 100) {
          break;
        }
      }
      const backData = { total: result.length, list: result };
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(backData));
      return;
    }

    const singerPath = `../json/music${page}.json`;
    const contents = await readFile(singerPath, { encoding: "utf-8" });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(contents);
  });
};

const getSong = (req, res) => {
  dealPost(req, async (params) => {
    const { songId } = params;
    const targetPath = `../localdatajson/song${songId}.json`;
    const contents = await readFile(targetPath, { encoding: "utf-8" });
    const { songName, singerName, type } = JSON.parse(contents);
    const src = `./localdata/${songName}.${type}`;
    const buffer = await readFile(`../localdata/${songName}.${type}`);
    const info = mp3Duration(buffer, buffer.length);
    const backData = { src, singerName, songName, ...info };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(backData));
  });
};

export { getMusic, getSong };
