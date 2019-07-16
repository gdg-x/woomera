import * as admin from 'firebase-admin';

admin.initializeApp({
  storageBucket: 'withgdg.appspot.com'
});

export * from './cron/chapters';
