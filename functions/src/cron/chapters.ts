import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { writeFileSync } from 'fs';
import { GeoFirestore } from 'geofirestore';
import { join } from 'path';
import { tmpdir } from 'os';
const sm = require('sitemap');

import request from '../shared/request';
import WoomeraTypes from '../types';

export const cronChapters = functions.pubsub.schedule('0 0 * * 0').onRun(() => {
  const directoryUrl = 'https://google-developers.appspot.com/community/gdg/directory/directory.json';
  return request({
    method: 'GET',
    url: directoryUrl
  }).then((result: WoomeraTypes.ChaptersRequest) => {
    const bucket = admin.storage().bucket();
    const geofirestore = new GeoFirestore(admin.firestore());
    const collection = geofirestore.collection('chapters');
    const updatedOn = new Date();
    const directoryJson = 'directory.json';
    const directoryJsonFilePath = join(tmpdir(), directoryJson);
    const sitemapXml = 'sitemap.xml';
    const sitemapXmlFilePath = join(tmpdir(), sitemapXml);
    const sitemap = sm.createSitemap({
      hostname: 'https://withgdg.com',
      cacheTime: 600000,
      urls: [
        { url: '/', changefreq: 'monthly', priority: 1 }
      ]
    });

    const chapters: WoomeraTypes.ChapterSimple[] = result.data.map((chapter) => {
      const $key = chapter.website.replace(/(http|https):\/\/(.+.)?meetup.com\//, '').replace('/', '').toLowerCase();
      sitemap.add({ url: `/chapter/${$key}`, changefreq: 'monthly', priority: 0.7 });
      return {
        city: chapter.cityarea,
        country: chapter.country,
        region: chapter.region,
        coordinates: { lat: chapter.geo.lat, lng: chapter.geo.lng },
        name: chapter.chapter_name,
        updatedOn: updatedOn.getTime(),
        $key
      };
    });

    writeFileSync(directoryJsonFilePath, JSON.stringify(chapters));
    writeFileSync(sitemapXmlFilePath, sitemap.toString());

    return bucket
      .upload(directoryJsonFilePath, { destination: directoryJson, gzip: true })
      .then(() => bucket.upload(sitemapXmlFilePath, { destination: sitemapXml, gzip: true }))
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
