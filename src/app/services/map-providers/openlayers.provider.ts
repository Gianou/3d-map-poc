import OLMap from 'ol/Map';
import View from 'ol/View';
import { GeoJSON } from 'ol/format';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import { OSM, TileWMS } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import {
  GeoJSONLayerOptions,
  I3DProvider,
  IMapProvider,
  WMSLayerOptions,
} from '../map-provider.interface';

export class OpenLayersProvider implements IMapProvider, I3DProvider {
  private map?: OLMap;
  private layers: Map<string, TileLayer<any> | VectorLayer<any>> = new Map();
  private buildings3DEnabled = false;

  initialize(
    containerId: string,
    center: [number, number],
    zoom: number,
  ): void {
    this.map = new OLMap({
      target: containerId,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([center[1], center[0]]),
        zoom: zoom,
      }),
    });
  }

  destroy(): void {
    if (this.map) {
      this.map.setTarget(undefined);
      this.map = undefined;
    }
    this.layers.clear();
    this.buildings3DEnabled = false;
  }

  addWMSLayer(id: string, options: WMSLayerOptions): void {
    if (!this.map) return;

    const wmsSource = new TileWMS({
      url: options.url,
      params: {
        LAYERS: options.layers,
        FORMAT: options.format || 'image/png',
        TRANSPARENT: options.transparent !== false,
        VERSION: options.version || '1.3.0',
      },
      serverType: 'geoserver',
    });

    const wmsLayer = new TileLayer({
      source: wmsSource,
    });

    this.map.addLayer(wmsLayer);
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

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(data, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857',
      }),
    });

    // OpenLayers requires its own Style objects, ignore library-agnostic style option
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: '#3388ff',
          width: 2,
        }),
        fill: new Fill({
          color: 'rgba(51, 136, 255, 0.4)',
        }),
      }),
    });

    this.map.addLayer(vectorLayer);
    this.layers.set(id, vectorLayer);

    // Handle onEachFeature if provided
    if (options?.onEachFeature) {
      vectorSource.getFeatures().forEach((feature) => {
        options.onEachFeature!(feature, vectorLayer);
      });
    }
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
      this.map.getView().setCenter(fromLonLat([center[1], center[0]]));
      this.map.getView().setZoom(zoom);
    }
  }

  getMapInstance(): OLMap | undefined {
    return this.map;
  }

  enable3DBuildings(): void {
    // OpenLayers doesn't have native 3D support
    // This would require OL-Cesium integration or similar
    console.warn('3D buildings not natively supported in OpenLayers');
    console.log('Consider using OL-Cesium for 3D capabilities');
    this.buildings3DEnabled = true;
  }

  disable3DBuildings(): void {
    this.buildings3DEnabled = false;
    console.log('3D buildings disabled (OpenLayers)');
  }

  is3DEnabled(): boolean {
    return this.buildings3DEnabled;
  }
}
