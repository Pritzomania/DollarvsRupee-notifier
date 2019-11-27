import { urlBase64ToUint8Array } from './convertVapid';

const publicVapidKey =
  'BPZWWJsYYmS351s-jpx-Tu4ixmD67lpJT9gZXJYIVuVxTc_9SrRVdG0DZz1yXnUA7je0sJlOYwiFOUtDhbudHdo';

const run = async () => {
  const registration = await window.navigator.serviceWorker
    .register('/service-worker.js', {
      scope: '/',
    })
    .catch(err => console.log(err));

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });

  await fetch('http://localhost:3100/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json',
    },
  });
};

export function start() {
  if ('serviceWorker' in window.navigator) {
    console.log('registering service worker');
    run().catch(error => console.log(error));
  }
}
