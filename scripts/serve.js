// 로컬 미리보기 서버: node scripts/serve.js  → http://localhost:4321
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const root = path.join(__dirname, "..", "dist");
const PORT = process.env.PORT || 4321;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
};

http
  .createServer((req, res) => {
    let p = decodeURIComponent(url.parse(req.url).pathname);
    if (p.endsWith("/")) p += "index.html";
    let file = path.join(root, p);
    fs.readFile(file, (err, data) => {
      if (err) {
        // SPA 스타일 대신 404 페이지 서빙
        fs.readFile(path.join(root, "404.html"), (e2, d2) => {
          res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
          res.end(e2 ? "Not Found" : d2);
        });
        return;
      }
      res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
      res.end(data);
    });
  })
  .listen(PORT, () => console.log(`미리보기: http://localhost:${PORT}`));
