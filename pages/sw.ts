self.addEventListener('activate', (event) => {
  console.log('claiming');
  event.waitUntil(clients.claim());
  console.log('claimed');
});
