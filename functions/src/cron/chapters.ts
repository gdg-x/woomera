import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { writeFileSync } from 'fs';
import { GeoFirestore } from 'geofirestore';
import { join } from 'path';
import { tmpdir } from 'os';

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
    const updatedOn = new Date().getTime();
    const fileName = 'directory.json';
    const tempFilePath = join(tmpdir(), fileName);

    const chapters: WoomeraTypes.ChapterSimple[] = result.data.map((chapter) => ({
      city: chapter.cityarea,
      country: chapter.country,
      region: chapter.region,
      coordinates: { lat: chapter.geo.lat, lng: chapter.geo.lng },
      name: chapter.chapter_name,
      updatedOn,
      $key: chapter.website.replace(/(http|https):\/\/(.+.)?meetup.com\//, '').replace('/', '').toLowerCase()
    }));
    writeFileSync(tempFilePath, JSON.stringify(chapters));

    return admin.storage().bucket()
      .upload(tempFilePath, { destination: fileName })
      .then(() => {
        const batches: Promise<any>[] = [];
        while (chapters.length) {
          const batch = geofirestore.batch();
          chapters.splice(0, 500).map((data) => {
            const chapter: WoomeraTypes.Chapter = {
              ...data,
              coordinates: new admin.firestore.GeoPoint(data.coordinates.lat, data.coordinates.lng)
            };
            const insert = collection.doc(chapter.$key);
            batch.set(insert, chapter);
          });
          batches.push(batch.commit());
        }
        return Promise.all(batches);
      });
  }).catch((error: any) => console.log('ERROR: ' + JSON.stringify(error)));
});
