const express = require("express");
const app = express();
const port = 3010;
const path = require("path");

app.use(express.static("static"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("pages/index.html"));
});

app.get("/sw.js", (req, res) => {
  res.contentType("application/javascript");
  res.sendFile(path.resolve("pages/sw.ts"));
});

app.get("/safe-module.js", (req, res) => {
  res.contentType("application/javascript");
  res.sendFile(path.resolve("pages/safe-module.ts"));
});

let count = 0;
app.get("/flaky-module.js", (req, res) => {
  if (count % 4 === 0) {
    res.contentType("application/javascript");
    res.sendFile(path.resolve("pages/flaky-module.ts"));
  } else {
    res.status(500);
    res.end();
  }

  count++;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
