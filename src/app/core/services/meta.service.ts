import { DOCUMENT } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { ɵgetDOM, ɵDomAdapter } from '@angular/platform-browser';
import { NgMetaService, MetaData } from 'ngmeta';

export interface EventSchema {
  '@context': 'https://schema.org';
  '@type': 'Event';
  name: string;
  startDate: string;
  endDate?: string;
  location?: {
    '@type': 'Place';
    name: string;
    address: {
      '@type': 'PostalAddress';
      streetAddress: string;
      addressLocality: string;
      postalCode: string;
      addressRegion: string;
      addressCountry: string;
    }
  };
  description: string;
  url: string;
}

interface MetaArg {
  description: string;
  key_photo?: {
    highres_link: string;
  };
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private _descriptionBase =
    'Find, connect, build. Join a developer community today.';
  private _dom: ɵDomAdapter = ɵgetDOM();
  private _imagePath = '/assets/gdg-global.jpg';
  private _titleBase = 'With GDG | Google Developer Groups';
  private _url = 'https://withgdg.com';

  constructor(@Inject(DOCUMENT) private _document: Document, private _meta: NgMetaService) {}

  private _canonical(path?: string): string {
    return this._url + (path ? ('/' + path) : '');
  }

  private _description(chapter: MetaArg, shorten = true): string {
    const description = (chapter.description || this._descriptionBase)
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s{2,}/g, ' ');
    return (description.length <= 200 || !shorten) ? description : description.substring(0, 197) + '...';
  }

  public eventSchemaClear(): void {
    this._removeTag('script[type=\'application/ld+json\']');
  }

  public eventSchemaSet(event: EventSchema): void {
    try {
      this.eventSchemaClear();
      event.description = this._description(event, false);
      event.url = this._canonical(event.url);
      const eventElement: HTMLElement = this._dom.createElement('script');
      this._dom.setAttribute(eventElement, 'type', 'application/ld+json');
      this._dom.setText(eventElement, JSON.stringify(event));
      this._dom.appendChild(this._document.head, eventElement);
    } catch (e) { }
  }

  private _image(chapter: MetaArg): string {
    return chapter.key_photo
      ? chapter.key_photo.highres_link
      : this._url + this._imagePath;
  }

  private _title(chapter: MetaArg): string {
    return (chapter.name) ? chapter.name : this._titleBase;
  }

  private _openGraph(chapter: MetaArg, path?: string): MetaData[] {
    return [
      { attribute: 'property', type: 'og:title', content: this._title(chapter) },
      { attribute: 'property', type: 'og:type', content: 'article' },
      { attribute: 'property', type: 'og:url', content: this._canonical(path) },
      { attribute: 'property', type: 'og:image', content: this._image(chapter) },
      { attribute: 'property', type: 'og:description', content: this._description(chapter) },
      { attribute: 'property', type: 'og:site_name', content: this._titleBase }
    ];
  }

  private _removeTag(tagSelector: string): void {
    try {
      const tag: HTMLElement = this._dom.querySelector(this._document.head, tagSelector);
      this._dom.remove(tag);
    } catch (e) { }
  }

  public set(data: MetaArg = {} as MetaArg, path?: string): void {
    this._meta.setHead({
      title: this._title(data),
      canonical: this._canonical(path),
      meta: [
        { attribute: 'name', type: 'description', content: this._description(data) },
        ...this._twitter(data),
        ...this._openGraph(data, path)
      ]
    });
  }

  private _twitter(chapter: MetaArg = {} as MetaArg): MetaData[] {
    return [
      { attribute: 'name', type: 'twitter:card', content: 'summary_large_image' },
      { attribute: 'name', type: 'twitter:title', content: this._title(chapter) },
      { attribute: 'name', type: 'twitter:description', content: this._description(chapter) },
      { attribute: 'name', type: 'twitter:image:src', content: this._image(chapter) }
    ];
  }
}
