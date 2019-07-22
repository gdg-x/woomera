import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp({
  storageBucket: 'withgdg.appspot.com'
});

export * from './cron/chapters';
export const universal = functions.https.onRequest((request, response) => {
  response.set('Cache-Control', 'public, max-age=3600, s-maxage=43200');
  require(`${process.cwd()}/dist/woomera-webpack/server`).app(
    request,
    response
  );
});
