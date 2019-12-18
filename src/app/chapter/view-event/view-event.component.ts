import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ChaptersService } from '@services/chapters.service';
import { MetaService, EventSchema } from '@services/meta.service';

@Component({
  selector: 'gdg-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit, OnDestroy {
  private _chapter: string;
  private _event: any;
  private _paramSubscription: Subscription;

  constructor(private _cs: ChaptersService, private _meta: MetaService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._paramSubscription = this._route.params.subscribe({
      next: (params: any) => {
        this._chapter = params.chapter;
        this._cs.findEvent(params.chapter, params.event).subscribe({
          next: (event) => {
            this._meta.set({
              description: event.description,
              name: `${event.name} | ${event.group.name}`
            }, `chapter/${params.chapter}/events/${params.event}`);
            const schema: EventSchema = {
              '@context': 'https://schema.org',
              '@type': 'Event',
              name: event.name,
              startDate: new Date(event.time).toISOString(),
              description: event.description,
              url: `chapter/${params.chapter}/events/${params.event}`
            };

            if (event.venue) {
              schema.location = {
                '@type': 'Place',
                name: event.venue.name ,
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: event.venue.address_1,
                  addressLocality: event.venue.city,
                  postalCode: event.venue.zip,
                  addressRegion: event.venue.state,
                  addressCountry: event.venue.country.toUpperCase()
                }
              };
            }

            this._meta.eventSchemaSet(schema);
            this._event = event;
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this._paramSubscription.unsubscribe();
    this._meta.eventSchemaClear();
  }

  get chapter(): string {
    return this._chapter;
  }

  get event(): any {
    return this._event;
  }
}
