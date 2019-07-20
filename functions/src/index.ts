import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp({
  storageBucket: 'withgdg.appspot.com'
});

export * from './cron/chapters';
export const universal = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}`;
  }
  require(`${process.cwd()}/dist/woomera-webpack/server`).app(
    request,
    response
  );
});
