import * as L from 'leaflet';
import {
  GeoJSONLayerOptions,
  IMapProvider,
  WMSLayerOptions,
} from '../map-provider.interface';

export class LeafletOSMProvider implements IMapProvider {
  private map?: L.Map;
  private layers = new Map<string, L.Layer>();

  initialize(
    containerId: string,
    center: [number, number],
    zoom: number,
  ): void {
    this.map = L.map(containerId, {
      center: center,
      zoom: zoom,
    });

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 19,
        attribution:
          'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan',
      },
    ).addTo(this.map);
  }

  destroy(): void {
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
}
