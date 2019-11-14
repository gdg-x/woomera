import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapsLink'
})
export class MapsLinkPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) { value = {}; }
    const lat: number = value.lat ? value.lat : 0;
    const lon: number = value.lon ? value.lon : 0;

    return `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
  }
}
