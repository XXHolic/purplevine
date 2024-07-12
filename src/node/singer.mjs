import { readFile, writeFile, unlink } from "node:fs/promises";
import { dealPost, backOkMsg, backErrMsg } from "./util.mjs";

const singerPath = "../json/singers.json";
const getSinger = async (req, res) => {
  const contents = await readFile(singerPath, { encoding: "utf-8" });
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(contents);
};

const getSingerMusic = (req, res) => {
  dealPost(req, async (params) => {
    const { singerId } = params;
    const filePath = `../json/singer${singerId}.json`;
    const contents = await readFile(filePath, { encoding: "utf-8" });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(contents);
  });
};

const singerMusicCollect = (req, res) => {
  dealPost(req, async (params) => {
    const { songMsg, listId } = params;
    const filePath = `../json/list${listId}.json`;
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
