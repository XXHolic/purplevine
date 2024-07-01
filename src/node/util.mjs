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

export { dealPost, backOkMsg };