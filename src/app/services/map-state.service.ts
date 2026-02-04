import { inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MapTechnology } from './map-provider.interface';

@Injectable({
  providedIn: 'root',
})
export class MapStateService {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  currentTechnology = signal<MapTechnology>('leaflet-osm');

  constructor() {
    // Initialize from URL query parameter on startup
    this.route.queryParams.subscribe((params) => {
      const tech = params['map'] as MapTechnology;
      if (tech && this.isValidTechnology(tech)) {
        this.currentTechnology.set(tech);
      }
    });
  }

  setTechnology(tech: MapTechnology): void {
    this.currentTechnology.set(tech);
    // Update URL without reloading the page
    this.router.navigate([], {
      queryParams: { map: tech },
      queryParamsHandling: 'merge',
    });
  }

  getTechnology(): MapTechnology {
    return this.currentTechnology();
  }

  private isValidTechnology(tech: string): tech is MapTechnology {
    return ['leaflet-osm', 'openlayers', 'maplibre'].includes(tech);
  }
}
