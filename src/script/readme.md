## 脚本使用说明
前提：源文件是以歌手单个文件夹创建，里面的歌曲和对应的歌词文件名称相同。

使用步骤：
1. 先在这里的 `singers.json` 文件中手动添加歌手信息
2. 把歌手信息放入到 `createSongJson.mjs` 中，在 `createMaxNum.json` 中找到上次生成歌曲的最后一个数字，然后加 1 赋给 startNum 。
3. 在  `generateSingerSong.mjs` 中给 `targetSingerId` 赋给歌手的 id 。
4. 把歌手的音乐文件复制到 `localdata` 下，重命名为歌手的 id ，检查歌曲歌词内容是否正确，不对的手动调整。。
5. 执行 `node createSongJson.mjs` 。
6. 在网页端检验歌曲和歌词展示是否对应正常，不对的再次手动调整。

上面执行完成无错误后，发现生成的文件不对，那么本地利用 git 进行撤销文件的修改或者手动删除，然后找到单独功能的 js 文件，单独执行。


每次的工作量完成后，对所有的歌曲文件要进行分页 json 切分，步骤为：
1. 先执行 `node songPath.mjs` 。
2. 再执行 `node separateSong.js` 。
