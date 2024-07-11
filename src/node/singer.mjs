import { readFile, writeFile, unlink } from "node:fs/promises";
import { dealPost, backOkMsg, backErrMsg } from "./util.mjs";

const singerPath = "../json/singers.json";
const getSinger = async (req, res) => {
  const contents = await readFile(singerPath, { encoding: "utf-8" });
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(contents);
};

export { getSinger };
