console.log("initial script loaded, trying dynamic load");

import("/flaky-module.js").then((mod) => {
  console.log("second script successfully loaded");
});
