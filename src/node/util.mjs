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

export { dealPost, backOkMsg, backErrMsg, formatDuration };