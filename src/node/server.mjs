import { createServer } from "node:http";

const start = (route) => {
  const server = createServer((req, res) => {
    try {
      route(req);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({code:200,data:""}));
    } catch (error) {
      console.log(error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end('Server Error');
    }
  });

  server.listen(6000, "127.0.0.1", () => {
    console.log("Listening on 127.0.0.1:6000");
  });
}

export { start }



