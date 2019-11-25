/* eslint-disable no-restricted-globals */
console.log('Loaded service worker!');

self.addEventListener('push', event => {
  const data = event.data.json();
  console.log('Got push', data);
  self.registration.showNotification(data.title);
  event.waitUntil(self.registration.showNotification(data.title));
});
