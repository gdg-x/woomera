import * as admin from 'firebase-admin';

export namespace WoomeraTypes {
  export type Chapter = {
    city: string;
    country: string;
    region: string;
    coordinates: admin.firestore.GeoPoint;
    name: string;
    updatedOn?: number;
    $key: string;
  };
  export type ChapterSimple = {
    city: string;
    country: string;
    region: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    name: string;
    updatedOn?: number;
    $key: string;
  };
  export type ChapterRequestData = {
    cityarea: string,
    country: string,
    region: string,
    website: string,
    geo: {
      lat: number,
      lng: number
    },
    chapter_name: string
  };
  export type ChaptersRequest = {
    filters_: {
      region: [
        'Africa',
        'Asia',
        'Australia',
        'Europe',
        'LATAM',
        'North America'
      ]
    },
    data: ChapterRequestData[]
  };
}

export default WoomeraTypes;
