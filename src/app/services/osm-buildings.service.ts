import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import * as L from 'leaflet';

// Declare OSMBuildings from global scope
declare var OSMBuildings: any;

@Injectable({
  providedIn: 'root',
})
export class OsmBuildingsService {
  private map?: L.Map;
  private osmBuildings?: any;

  buildingsEnabled = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  setMap(map: L.Map): void {
    this.map = map;
    this.initOSMBuildings();
  }

  private initOSMBuildings(): void {
    if (!this.map) return;

    try {
      if (typeof OSMBuildings !== 'undefined') {
        this.osmBuildings = new OSMBuildings(this.map);
        console.log('OSM Buildings initialized successfully');
      } else {
        console.warn('OSMBuildings library not loaded yet');
      }
    } catch (error) {
      console.error('Error initializing OSM Buildings:', error);
    }
  }

  toggleBuildings(): void {
    const currentState = this.buildingsEnabled();

    // Try to initialize if not already done
    if (!this.osmBuildings) {
      this.initOSMBuildings();
    }

    // Check if OSMBuildings is available
    if (!this.osmBuildings) {
      console.error(
        'OSM Buildings library not available. Make sure the script is loaded.',
      );
      this.buildingsEnabled.set(false);
      return;
    }

    // Toggle the state
    this.buildingsEnabled.set(!currentState);

    if (this.buildingsEnabled()) {
      // Load buildings from hardcoded GeoJSON file
      this.loadBuildingsFromGeoJSON();
      console.log('OSM Buildings layer enabled');
    } else {
      // Remove buildings layer by setting empty data
      if (this.osmBuildings) {
        this.osmBuildings.set({ type: 'FeatureCollection', features: [] });
        console.log('OSM Buildings layer disabled');
      }
    }
  }

  private loadBuildingsFromGeoJSON(): void {
    if (!this.osmBuildings) return;

    // Load hardcoded GeoJSON from data folder
    this.http.get('/data/buildings.geojson').subscribe({
      next: (geoJsonData: any) => {
        if (this.osmBuildings) {
          this.osmBuildings.set(geoJsonData);
          console.log('Buildings loaded from GeoJSON file');
        }
      },
      error: (error) => {
        console.error('Error loading buildings GeoJSON:', error);
      },
    });
  }
}
