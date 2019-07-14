import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { GeoFirestore } from 'geofirestore';

import request from '../shared/request';
import WoomeraTypes from '../types';

export const cronChapters = functions.pubsub.schedule('0 0 1 * *').onRun(() => {
  const directoryUrl = 'https://google-developers.appspot.com/community/gdg/directory/directory.json';
  return request({
    method: 'GET',
    url: directoryUrl
  }).then((result: WoomeraTypes.ChaptersRequest) => {
    const geofirestore = new GeoFirestore(admin.firestore());
    const collection = geofirestore.collection('chapters');
    const chapterBatches: WoomeraTypes.Chapter[][] = [];
    const batches: Promise<any>[] = [];
    const updatedOn = new Date().getTime();

    while (result.data.length) {
      const temp = result.data.splice(0, 500).map((chapter) => ({
        city: chapter.cityarea,
        country: chapter.country,
        region: chapter.region,
        coordinates: new admin.firestore.GeoPoint(chapter.geo.lat, chapter.geo.lng),
        name: chapter.chapter_name,
        updatedOn,
        $key: chapter.website.replace(/(http|https):\/\/(.+.)?meetup.com\//, '').replace('/', '').toLowerCase()
      }));
      chapterBatches.push(temp);
    }

    chapterBatches.forEach((chapters) => {
      const batch = geofirestore.batch();
      chapters.forEach((chapter) => {
        const insert = collection.doc(chapter.$key);
        batch.set(insert, chapter);
      });
      batches.push(batch.commit());
    });

    return Promise.all(batches);
  }).catch((error: any) => console.log('ERROR: ' + JSON.stringify(error)));
});
