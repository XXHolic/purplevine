import { readFile, writeFile, unlink } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dealPost, backOkMsg, backErrMsg } from "./util.mjs";


// 这个是针对 pm2 启动时无法找到路径的问题
const fileName = fileURLToPath(import.meta.url)
const preFold = resolve(dirname(fileName), '..');
const sheetPathPrefix = `${preFold}/json/list`;
const allListPath = `${preFold}/json/allList.json`;

const sheetList = async (res) => {
  const contents = await readFile(allListPath, { encoding: "utf-8" });
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(contents);
};

const sheetAdd = async (req, res) => {
  const contents = await readFile(allListPath, { encoding: "utf-8" });
  const contentsObj = JSON.parse(contents);
  const maxIdArr = contentsObj.map((item) => item.listId);
  const maxId = Math.max(...maxIdArr);
  const newId = maxId + 1;
  dealPost(req, (params) => {
    params.listId = newId;
    const isRepeat = contentsObj.find(
      (ele) => ele.listName === params.listName
    );
    if (isRepeat) {
      backErrMsg(res, "歌单名称已存在");
      return;
    }
    contentsObj.push(params);
    const newFile = {
      listId: newId,
      listName: params.listName,
      songList: [],
    };
    writeFile(allListPath, JSON.stringify(contentsObj)).then(() => {
      writeFile(
        `${sheetPathPrefix}${newId}.json`,
        JSON.stringify(newFile)
      ).then(() => {
        backOkMsg(res);
      });
    });
  });
};

const sheetDele = async (req, res) => {
  const contents = await readFile(allListPath, { encoding: "utf-8" });
  const contentsObj = JSON.parse(contents);
  dealPost(req, (params) => {
    if (params.listId == 1) {
      backErrMsg(res, "默认歌单不能删除");
      return;
    }
    const newArr = contentsObj.filter((ele) => ele.listId !== params.listId);
    writeFile(allListPath, JSON.stringify(newArr)).then(() => {
      // 删除文件
      unlink(`${sheetPathPrefix}${params.listId}.json`).then(() => {
        backOkMsg(res);
      });
    });
  });
};

const sheetSort = (req, res) => {
  dealPost(req, (params) => {
    writeFile(allListPath, JSON.stringify(params)).then(() => {
      backOkMsg(res);
    });
  });
};

const sheetEdit = async (req, res) => {
  const contents = await readFile(allListPath, { encoding: "utf-8" });
  const contentsObj = JSON.parse(contents);
  dealPost(req, async (params) => {
    const { listId, listName } = params;
    const isRepeat = contentsObj.find(
      (ele) => ele.listId != listId && ele.listName === listName
    );
    if (isRepeat) {
      backErrMsg(res, "歌单名称已存在");
      return;
    }

    const singleFilePath = `${sheetPathPrefix}${listId}.json`;
    const singleFile = await readFile(singleFilePath, {
      encoding: "utf-8",
    });
    const singleFileObj = JSON.parse(singleFile);
    const newContents = contentsObj.map((ele) => {
      if (ele.listId === listId) {
        ele.listName = listName;
      }
      return ele;
    });
    const updateFile = { ...singleFileObj, listName: listName };
    writeFile(allListPath, JSON.stringify(newContents)).then(() => {
      writeFile(singleFilePath, JSON.stringify(updateFile)).then(() => {
        backOkMsg(res);
      });
    });
  });
};

const sheetDetail = (req, res) => {
  dealPost(req, async (params) => {
    const { listId, listName } = params;
    const singleFilePath = `${sheetPathPrefix}${listId}.json`;
    const contents = await readFile(singleFilePath, {
      encoding: "utf-8",
    });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(contents);
  });
};

const sheetDetailSort = (req, res) => {
  dealPost(req, async (params) => {
    const { listId, newList } = params;
    const singleFilePath = `${sheetPathPrefix}${listId}.json`;
    const contents = await readFile(singleFilePath, { encoding: "utf-8" });
    const contentsObj = JSON.parse(contents);
    contentsObj.songList = newList;
    writeFile(singleFilePath, JSON.stringify(contentsObj)).then(() => {
      backOkMsg(res);
    });
  });
};

const sheetDetailMove = (req, res) => {
  dealPost(req, async (params) => {
    const { songId, oldListId, newListId } = params;
    const oldFilePath = `${sheetPathPrefix}${oldListId}.json`;
    const newFilePath = `${sheetPathPrefix}${newListId}.json`;
    const oldContents = await readFile(oldFilePath, { encoding: "utf-8" });
    const newContents = await readFile(newFilePath, { encoding: "utf-8" });
    const oldContentsObj = JSON.parse(oldContents);
    const newContentsObj = JSON.parse(newContents);
    const songList = oldContentsObj.songList;
    const targetSong = songList.find((ele) => ele.songId == songId);
    const oldLeftSong = songList.filter((ele) => ele.songId != songId);
    oldContentsObj.songList = oldLeftSong;
    newContentsObj.songList.push({ ...targetSong });
    writeFile(oldFilePath, JSON.stringify(oldContentsObj)).then(() => {
      writeFile(newFilePath, JSON.stringify(newContentsObj)).then(() => {
        backOkMsg(res);
      });
    });
  });
};

const sheetDetailDele = (req, res) => {
  dealPost(req, async (params) => {
    const { songId, listId } = params;
    const filePath = `${sheetPathPrefix}${listId}.json`;
    const contents = await readFile(filePath, { encoding: "utf-8" });
    const contentsObj = JSON.parse(contents);
    const newList = contentsObj.songList.filter((ele) => ele.songId != songId);
    contentsObj.songList = newList;
    writeFile(filePath, JSON.stringify(contentsObj)).then(() => {
      backOkMsg(res);
    });
  });
};

export {
  sheetList,
  sheetAdd,
  sheetDele,
  sheetSort,
  sheetEdit,
  sheetDetail,
  sheetDetailSort,
  sheetDetailMove,
  sheetDetailDele,
};
