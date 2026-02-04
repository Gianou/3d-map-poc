import maplibregl, {
  LngLatLike,
  Map as MapLibreMap,
  RasterSourceSpecification,
} from 'maplibre-gl';
import {
  GeoJSONLayerOptions,
  IMapProvider,
  WMSLayerOptions,
} from '../map-provider.interface';

export class MapLibreProvider implements IMapProvider {
  private map?: MapLibreMap;
  private layers: Map<string, string> = new Map();

  initialize(
    containerId: string,
    center: [number, number],
    zoom: number,
  ): void {
    this.map = new maplibregl.Map({
      container: containerId,
      style: {
        version: 8,
        sources: {
          'satellite-tiles': {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            ],
            tileSize: 256,
            attribution:
              'Tiles © Esri — Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan',
          },
        },
        layers: [
          {
            id: 'satellite-tiles-layer',
            type: 'raster',
            source: 'satellite-tiles',
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: [center[1], center[0]] as LngLatLike,
      zoom: zoom,
    });
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

    const sourceId = `${id}-source`;
    const layerId = `${id}-layer`;

    // Construct WMS URL
    const bbox = '{bbox-epsg-3857}';
    const wmsUrl = `${options.url}?SERVICE=WMS&VERSION=${options.version || '1.3.0'}&REQUEST=GetMap&LAYERS=${options.layers}&BBOX=${bbox}&WIDTH=256&HEIGHT=256&FORMAT=${options.format || 'image/png'}&TRANSPARENT=${options.transparent !== false}&CRS=EPSG:3857`;

    this.map.addSource(sourceId, {
      type: 'raster',
      tiles: [wmsUrl],
      tileSize: 256,
    } as RasterSourceSpecification);

    this.map.addLayer({
      id: layerId,
      type: 'raster',
      source: sourceId,
    });

    this.layers.set(id, layerId);
  }

  removeWMSLayer(id: string): void {
    const layerId = this.layers.get(id);
    if (layerId && this.map) {
      const sourceId = `${id}-source`;
      if (this.map.getLayer(layerId)) {
        this.map.removeLayer(layerId);
      }
      if (this.map.getSource(sourceId)) {
        this.map.removeSource(sourceId);
      }
      this.layers.delete(id);
    }
  }

  addGeoJSONLayer(id: string, data: any, options?: GeoJSONLayerOptions): void {
    if (!this.map) return;

    const sourceId = `${id}-source`;
    const layerId = `${id}-layer`;

    this.map.addSource(sourceId, {
      type: 'geojson',
      data: data,
    });

    // Determine geometry type and add appropriate layer
    const firstFeature = data.features?.[0];
    const geometryType = firstFeature?.geometry?.type;

    if (geometryType === 'Point' || geometryType === 'MultiPoint') {
      this.map.addLayer({
        id: layerId,
        type: 'circle',
        source: sourceId,
        paint: {
          'circle-radius': 6,
          'circle-color': '#3388ff',
          'circle-opacity': 0.8,
        },
      });
    } else if (
      geometryType === 'LineString' ||
      geometryType === 'MultiLineString'
    ) {
      this.map.addLayer({
        id: layerId,
        type: 'line',
        source: sourceId,
        paint: {
          'line-color': '#3388ff',
          'line-width': 2,
          'line-opacity': 0.8,
        },
      });
    } else {
      // Polygon or MultiPolygon
      this.map.addLayer({
        id: layerId,
        type: 'fill',
        source: sourceId,
        paint: {
          'fill-color': '#3388ff',
          'fill-opacity': 0.4,
        },
      });

      // Add outline
      this.map.addLayer({
        id: `${layerId}-outline`,
        type: 'line',
        source: sourceId,
        paint: {
          'line-color': '#3388ff',
          'line-width': 2,
          'line-opacity': 0.8,
        },
      });
    }

    this.layers.set(id, layerId);

    // Add click handler for popups if onEachFeature is provided
    if (options?.onEachFeature) {
      this.map.on('click', layerId, (e) => {
        if (e.features && e.features.length > 0) {
          const feature = e.features[0];
          options.onEachFeature!(feature, null);
        }
      });
    }
  }

  removeGeoJSONLayer(id: string): void {
    const layerId = this.layers.get(id);
    if (layerId && this.map) {
      const sourceId = `${id}-source`;
      if (this.map.getLayer(layerId)) {
        this.map.removeLayer(layerId);
      }
      // Check for outline layer
      const outlineLayerId = `${layerId}-outline`;
      if (this.map.getLayer(outlineLayerId)) {
        this.map.removeLayer(outlineLayerId);
      }
      if (this.map.getSource(sourceId)) {
        this.map.removeSource(sourceId);
      }
      this.layers.delete(id);
    }
  }

  setView(center: [number, number], zoom: number): void {
    if (this.map) {
      this.map.setCenter([center[1], center[0]] as LngLatLike);
      this.map.setZoom(zoom);
    }
  }

  getMapInstance(): MapLibreMap | undefined {
    return this.map;
  }
}
