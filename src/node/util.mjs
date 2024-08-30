const dealPost = (req, method) => {
  let post = "";

  req.on("data", (chunk) => {
    post += chunk;
  });

  req.on("end", () => {
    const postObj = JSON.parse(post);
    method(postObj);
  });

}

const backOkMsg = (res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ code: 200, data: "" }));
};

const backErrMsg = (res, msg) => {
  res.writeHead(500, { "Content-Type": "application/json" });
  res.end(msg);
};

const formatDuration = (duration) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);

  const fHours = String(hours).padStart(2, "0");
  const fMinutes = String(minutes).padStart(2, "0");
  const fSeconds = String(seconds).padStart(2, "0");
  const combine =
    fHours == "00"
      ? `${fMinutes}:${fSeconds}`
      : `${fHours}:${fMinutes}:${fSeconds}`;

  return combine;
}

// 按照播放次数从多到少排序
const dataSort = (arr) => {
  // console.log("初始数组：", arr); // 5,4,3,2,1
  const len = arr.length;
  //一次次遍历，有多少个数就遍历多少次
  for (let i = 0; i < len; i++) {
    //循环两两比较数组中的数字
    for (let j = 0; j < len; j++) {
      const ele1 = arr[j],
        ele2 = arr[j + 1];
      //if判断，如果数组中的当前一个比后一个大，那么两个交换一下位置
      if (ele1 && ele2 && ele1.playCount < ele2.playCount) {
        var tmp = { ...arr[j] };
        arr[j] = { ...arr[j + 1] };
        arr[j + 1] = tmp;
        // console.log("i=" + i, arr);
      }
    }
  }
};



export { dealPost, backOkMsg, backErrMsg, formatDuration, dataSort };