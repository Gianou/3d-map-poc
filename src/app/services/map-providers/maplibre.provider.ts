import maplibregl, {
  LngLatLike,
  Map as MapLibreMap,
  RasterSourceSpecification,
} from 'maplibre-gl';
import {
  GeoJSONLayerOptions,
  I3DProvider,
  IMapProvider,
  WMSLayerOptions,
} from '../map-provider.interface';

export class MapLibreProvider implements IMapProvider, I3DProvider {
  private map?: MapLibreMap;
  private layers: Map<string, string> = new Map();
  private buildings3DEnabled = false;

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
          'osm-tiles': {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
          },
        },
        layers: [
          {
            id: 'osm-tiles-layer',
            type: 'raster',
            source: 'osm-tiles',
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
    this.buildings3DEnabled = false;
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

  enable3DBuildings(): void {
    if (!this.map) return;

    // Add 3D buildings layer using MapLibre's built-in extrusion
    const layers = this.map.getStyle().layers;
    const labelLayerId = layers?.find((layer) => layer.type === 'symbol')?.id;

    if (!this.map.getSource('openmaptiles')) {
      // Add OpenMapTiles source for building data
      this.map.addSource('openmaptiles', {
        type: 'vector',
        url: 'https://api.maptiler.com/tiles/v3/tiles.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
      });
    }

    if (!this.map.getLayer('3d-buildings')) {
      this.map.addLayer(
        {
          id: '3d-buildings',
          source: 'openmaptiles',
          'source-layer': 'building',
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'render_height'],
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'render_min_height'],
            ],
            'fill-extrusion-opacity': 0.6,
          },
        },
        labelLayerId,
      );
    }

    this.buildings3DEnabled = true;
    console.log('3D buildings enabled (MapLibre)');
  }

  disable3DBuildings(): void {
    if (this.map && this.map.getLayer('3d-buildings')) {
      this.map.removeLayer('3d-buildings');
      this.buildings3DEnabled = false;
      console.log('3D buildings disabled (MapLibre)');
    }
  }

  is3DEnabled(): boolean {
    return this.buildings3DEnabled;
  }
}
