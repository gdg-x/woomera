import { Injectable } from '@angular/core';
import { NgMetaService, MetaData } from 'ngmeta';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private _descriptionBase =
    'Find, connect, build. Join a developer community today.';
  private _imagePath = '/assets/gdg-global.jpg';
  private _titleBase = 'With GDG | Google Developer Groups';
  private _url = 'https://withgdg.com';

  constructor(private _meta: NgMetaService) {}

  private _canonical(path?: string): string {
    return this._url + (path ? ('/' + path) : '');
  }

  private _description(chapter: any): string {
    const description = (chapter.description || this._descriptionBase)
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim().sub;
    return (description.length <= 200) ? description : description.substring(0, 197) + '...';
  }

  private _image(chapter: any): string {
    return chapter.key_photo
      ? chapter.key_photo.highres_link
      : this._url + this._imagePath;
  }

  private _title(chapter: any): string {
    return (chapter.name) ? chapter.name + ' | With GDG' : this._titleBase;
  }

  private _openGraph(chapter: any, path?: string): MetaData[] {
    return [
      { attribute: 'property', type: 'og:title', content: this._title(chapter) },
      { attribute: 'property', type: 'og:type', content: 'article' },
      { attribute: 'property', type: 'og:url', content: this._canonical(path) },
      { attribute: 'property', type: 'og:image', content: this._image(chapter) },
      { attribute: 'property', type: 'og:description', content: this._description(chapter) },
      { attribute: 'property', type: 'og:site_name', content: this._titleBase }
    ];
  }

  public set(chapter: any = {}, path?: string): void {
    this._meta.setHead({
      title: this._title(chapter),
      canonical: this._canonical(path),
      meta: [
        { type: 'description', content: this._description(chapter) },
        ...this._twitter(chapter),
        ...this._openGraph(chapter, path)
      ]
    });
  }

  private _twitter(chapter: any = {}): MetaData[] {
    return [
      { type: 'twitter:card', content: 'summary_large_image' },
      { type: 'twitter:title', content: this._title(chapter) },
      { type: 'twitter:description', content: this._description(chapter) },
      { type: 'twitter:image:src', content: this._image(chapter) }
    ];
  }
}
