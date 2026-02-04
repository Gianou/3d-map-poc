import { Injectable, inject } from '@angular/core';
import { I3DProvider, IMapProvider } from './map-provider.interface';
import { LeafletOSMProvider } from './map-providers/leaflet-osm.provider';
import { MapLibreProvider } from './map-providers/maplibre.provider';
import { OpenLayersProvider } from './map-providers/openlayers.provider';
import { MapStateService } from './map-state.service';

@Injectable({
  providedIn: 'root',
})
export class MapFactoryService {
  private mapStateService = inject(MapStateService);

  createMapProvider(): IMapProvider & I3DProvider {
    const tech = this.mapStateService.currentTechnology();

    switch (tech) {
      case 'leaflet-osm':
        return new LeafletOSMProvider();
      case 'openlayers':
        return new OpenLayersProvider();
      case 'maplibre':
        return new MapLibreProvider();
      default:
        console.warn(`Unknown technology: ${tech}, defaulting to Leaflet`);
        return new LeafletOSMProvider();
    }
  }
}
