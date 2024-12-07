import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dealPost } from "./util.mjs";

// 这个是针对 pm2 启动时无法找到路径的问题
const fileName = fileURLToPath(import.meta.url)
const preFold = resolve(dirname(fileName), '..');

const getPure = (req, res) => {
  dealPost(req, async (params) => {
    const { page, tag } = params;
    if (tag) {
      // 先找到总共有多少分割的文件
      const firstFile = `${preFold}/json/pure1.json`;
      const data = await readFile(firstFile, { encoding: "utf-8" });
      const { total, pageSize } = JSON.parse(data);
      const num = Math.round(total / pageSize);
      const len = num ? num : 1;
      let result = [];
      for (let index = 0; index < len; index++) {
        const targetPath = `${preFold}/json/pure${index + 1}.json`;
        const contents = await readFile(targetPath, { encoding: "utf-8" });
        const { list } = JSON.parse(contents);
        let arr = list.filter((ele) => {
          const { tags } = ele;
          return tags.includes(Number(tag));
        });
        result = result.concat(arr);
        // 搜索结果不分页，目前最多200条
        if (result.length >= 200) {
          break;
        }
      }
      const backData = { total: result.length, list: result };
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(backData));
      return;
    }

    const musicPath = `${preFold}/json/pure${page}.json`;
    const contents = await readFile(musicPath, { encoding: "utf-8" });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(contents);
  });
};



export { getPure };
