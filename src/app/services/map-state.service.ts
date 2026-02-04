import { Injectable, signal } from '@angular/core';
import { MapTechnology } from './map-provider.interface';

@Injectable({
  providedIn: 'root',
})
export class MapStateService {
  currentTechnology = signal<MapTechnology>('leaflet-osm');

  setTechnology(tech: MapTechnology): void {
    this.currentTechnology.set(tech);
  }

  getTechnology(): MapTechnology {
    return this.currentTechnology();
  }
}
