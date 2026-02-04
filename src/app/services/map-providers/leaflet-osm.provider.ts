import * as L from 'leaflet';
import {
  GeoJSONLayerOptions,
  I3DProvider,
  IMapProvider,
  WMSLayerOptions,
} from '../map-provider.interface';

// Declare OSMBuildings from global scope
declare var OSMBuildings: any;

export class LeafletOSMProvider implements IMapProvider, I3DProvider {
  private map?: L.Map;
  private layers = new Map<string, L.Layer>();
  private osmBuildings?: any;
  private buildings3DEnabled = false;

  initialize(
    containerId: string,
    center: [number, number],
    zoom: number,
  ): void {
    this.map = L.map(containerId, {
      center: center,
      zoom: zoom,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    // Initialize OSM Buildings if available
    this.initOSMBuildings();
  }

  destroy(): void {
    if (this.osmBuildings) {
      try {
        // Clean up OSM Buildings
        this.buildings3DEnabled = false;
        this.osmBuildings = undefined;
      } catch (error) {
        console.error('Error cleaning up OSM Buildings:', error);
      }
    }

    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }
    this.layers.clear();
  }

  addWMSLayer(id: string, options: WMSLayerOptions): void {
    if (!this.map) return;

    const wmsLayer = L.tileLayer.wms(options.url, {
      layers: options.layers,
      format: options.format || 'image/png',
      transparent: options.transparent !== false,
      version: options.version || '1.3.0',
      attribution: options.attribution || '',
    });

    wmsLayer.addTo(this.map);
    this.layers.set(id, wmsLayer);
  }

  removeWMSLayer(id: string): void {
    const layer = this.layers.get(id);
    if (layer && this.map) {
      this.map.removeLayer(layer);
      this.layers.delete(id);
    }
  }

  addGeoJSONLayer(id: string, data: any, options?: GeoJSONLayerOptions): void {
    if (!this.map) return;

    const geoJsonLayer = L.geoJSON(data, {
      style:
        options?.style ||
        (() => ({
          color: '#3388ff',
          weight: 2,
          opacity: 0.8,
          fillOpacity: 0.4,
        })),
      onEachFeature: options?.onEachFeature,
    });

    geoJsonLayer.addTo(this.map);
    this.layers.set(id, geoJsonLayer);
  }

  removeGeoJSONLayer(id: string): void {
    const layer = this.layers.get(id);
    if (layer && this.map) {
      this.map.removeLayer(layer);
      this.layers.delete(id);
    }
  }

  setView(center: [number, number], zoom: number): void {
    if (this.map) {
      this.map.setView(center, zoom);
    }
  }

  getMapInstance(): L.Map | undefined {
    return this.map;
  }

  private initOSMBuildings(): void {
    if (!this.map) return;

    try {
      if (typeof OSMBuildings !== 'undefined') {
        this.osmBuildings = new OSMBuildings(this.map);
        console.log('OSM Buildings initialized successfully for Leaflet');
      } else {
        console.warn('OSMBuildings library not loaded yet');
      }
    } catch (error) {
      console.error('Error initializing OSM Buildings:', error);
    }
  }

  enable3DBuildings(): void {
    if (!this.osmBuildings) {
      this.initOSMBuildings();
    }

    if (!this.osmBuildings) {
      console.error('OSM Buildings library not available');
      return;
    }

    try {
      // Load buildings from hardcoded GeoJSON file
      this.loadBuildingsFromGeoJSON();
      this.buildings3DEnabled = true;
      console.log('3D buildings enabled - loading from buildings.geojson');
    } catch (error) {
      console.error('Error enabling 3D buildings:', error);
    }
  }

  disable3DBuildings(): void {
    if (this.osmBuildings && this.buildings3DEnabled) {
      try {
        // Remove buildings layer by setting empty data
        this.osmBuildings.set({ type: 'FeatureCollection', features: [] });
        this.buildings3DEnabled = false;
        console.log('3D buildings disabled');
      } catch (error) {
        console.error('Error disabling 3D buildings:', error);
      }
    }
  }

  private loadBuildingsFromGeoJSON(): void {
    if (!this.osmBuildings) return;

    // Load hardcoded GeoJSON from data folder
    fetch('/data/buildings.geojson')
      .then((response) => response.json())
      .then((geoJsonData) => {
        if (this.osmBuildings) {
          this.osmBuildings.set(geoJsonData);
          console.log('Buildings loaded from GeoJSON file');
        }
      })
      .catch((error) => {
        console.error('Error loading buildings GeoJSON:', error);
      });
  }

  is3DEnabled(): boolean {
    return this.buildings3DEnabled;
  }
}
