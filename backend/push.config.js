import webpush from 'web-push';

export default function configure() {
  const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
  const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

  webpush.setVapidDetails(
    `mailto:${process.env.EMAIL}`,
    publicVapidKey,
    privateVapidKey
  );
}
