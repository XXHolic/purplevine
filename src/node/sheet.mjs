import { readFile, writeFile, unlink } from "node:fs/promises";
import { dealPost, backOkMsg } from "./util.mjs";

const sheetPathPrefix = "../json/list";
const allListPath = "../json/allList.json"

const sheetList = async (res) => {
  const contents = await readFile(allListPath, { encoding: 'utf-8' });
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
    const newArr = contentsObj.filter((ele) => ele.listId !== Number(params.listId));
    writeFile(allListPath, JSON.stringify(newArr)).then(() => {
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


export { sheetList, sheetAdd, sheetDele, sheetSort };