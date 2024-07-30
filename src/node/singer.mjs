import { readFile, writeFile, unlink } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dealPost, backOkMsg, backErrMsg } from "./util.mjs";

// 这个是针对 pm2 启动时无法找到路径的问题
const fileName = fileURLToPath(import.meta.url)
const preFold = resolve(dirname(fileName), '..');
const singerPath = `${preFold}/json/singers.json`;
const getSinger = async (req, res) => {
  const contents = await readFile(singerPath, { encoding: "utf-8" });
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(contents);
};

const getSingerMusic = (req, res) => {
  dealPost(req, async (params) => {
    const { singerId } = params;
    const filePath = `${preFold}/json/singer${singerId}.json`;
    const contents = await readFile(filePath, { encoding: "utf-8" });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(contents);
  });
};

const singerMusicCollect = (req, res) => {
  dealPost(req, async (params) => {
    const { songMsg, listId } = params;
    const filePath = `${preFold}/json/list${listId}.json`;
    const contents = await readFile(filePath, { encoding: "utf-8" });
    const contentsObj = JSON.parse(contents);
    const songList = contentsObj.songList;
    const isHad = songList.find((ele) => ele.songId == songMsg.songId);
    if (!isHad) {
      songList.push(songMsg);
    }
    writeFile(filePath, JSON.stringify(contentsObj)).then(() => {
      backOkMsg(res);
    });
  });
};

export { getSinger, getSingerMusic, singerMusicCollect };
