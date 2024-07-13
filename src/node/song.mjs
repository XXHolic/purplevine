import { readFile, writeFile, unlink } from "node:fs/promises";
import { dealPost, backOkMsg, backErrMsg } from "./util.mjs";

const getMusic = (req, res) => {
  dealPost(req, async (params) => {
    const { page } = params;
    const singerPath = `../json/music${page}.json`;
    const contents = await readFile(singerPath, { encoding: "utf-8" });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(contents);
  });
};

export { getMusic };
