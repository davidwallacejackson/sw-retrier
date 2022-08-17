const express = require('express');
const app = express();
const port = 3010;
const path = require('path');

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('pages/index.html'));
});

app.get('/sw.js', (req, res) => {
  console.log('serving service worker');
  res.contentType('application/javascript');
  res.sendFile(path.resolve('pages/sw.ts'));
});

app.get('/safe-module', (req, res) => {
  res.contentType('application/javascript');
  res.sendFile(path.resolve('pages/safe-module.ts'));
});

let count = 0;
app.get('/flaky-module', (req, res) => {
  if (count % 2 === 0) {
    res.contentType('application/javascript');
    res.sendFile(path.resolve('pages/flaky-module.ts'));
  } else {
    res.status(500);
    res.end();
  }

  count++;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
