console.log('initial script loaded, trying dynamic load');

async function superImport(path) {
  let caughtErr;
  for (let i = 0; i < 10; i++) {
    try {
      return await import(path);
    } catch (e) {
      console.warn(`import attempt ${i} has failed`);
      caughtErr = e;
    }
  }

  throw caughtErr;
}

superImport('/flaky-module').then((mod) => {
  console.log('second script successfully loaded');
});
