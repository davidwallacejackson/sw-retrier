self.addEventListener("activate", (event) => {
  console.log("claiming");
  event.waitUntil(clients.claim());
  console.log("claimed");
});

async function fetchWithRetry(request) {
  let resp, caughtErr;
  for (let i = 0; i < 10; i++) {
    try {
      caughtErr = null;
      console.log("fetching");
      resp = await fetch(request);

      if (resp.status === 500) {
        console.log(`fetch attempt ${i} failed with server error`);
        continue;
      }
      return resp;
    } catch (e) {
      console.warn(`fetch attempt ${i} failed with network error`);
      caughtErr = e;
    }
  }

  if (caughtErr) {
    throw caughtErr;
  }

  return resp;
}

self.addEventListener("fetch", (event) => {
  if (/\.js$|.ts$/.test(event.request.url)) {
    event.respondWith(fetchWithRetry(event.request));
  }
});
