/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
console.log('Loaded service worker!');

self.addEventListener('push', event => {
  const data = event.data.json();
  console.log('Got push', data);
  const options = {
    body: 'Money!Money!',
    icon: 'images/alert.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2',
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: 'images/alert.png',
      },
      { action: 'close', title: 'Close', icon: 'images/alert.png' },
    ],
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', function(e) {
  const { notification } = e;
  const { primaryKey } = notification.data;
  const { action } = e;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow(`${self.registration.scope}rate`);
    notification.close();
  }
});
