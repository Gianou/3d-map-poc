import { Deck } from '@deck.gl/core';
import { GeoJsonLayer } from '@deck.gl/layers';
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
  private buildingsLayer?: VectorLayer<any>;
  private deckOverlay?: Deck;
  private deckContainer?: HTMLDivElement;

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
    // Clean up deck.gl overlay
    if (this.deckOverlay) {
      this.deckOverlay.finalize();
      this.deckOverlay = undefined;
    }
    if (this.deckContainer) {
      this.deckContainer.remove();
      this.deckContainer = undefined;
    }

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
    if (!this.map) return;

    // Create deck.gl overlay container
    const mapElement = this.map.getTargetElement();
    if (!mapElement) return;

    this.deckContainer = document.createElement('div');
    this.deckContainer.id = 'deck-overlay-' + Date.now();
    this.deckContainer.style.position = 'absolute';
    this.deckContainer.style.top = '0';
    this.deckContainer.style.left = '0';
    this.deckContainer.style.width = '100%';
    this.deckContainer.style.height = '100%';
    this.deckContainer.style.pointerEvents = 'none';
    mapElement.appendChild(this.deckContainer);

    // Load buildings.geojson and display with deck.gl 3D extrusion
    fetch('/data/buildings.geojson')
      .then((response) => response.json())
      .then((geoJsonData) => {
        if (!this.map || !this.deckContainer) return;

        const view = this.map.getView();

        // Create deck.gl instance - pass parent container, deck.gl will create canvas
        this.deckOverlay = new Deck({
          parent: this.deckContainer,
          width: '100%',
          height: '100%',
          initialViewState: {
            longitude: (view.getCenter()![0] / 20037508.34) * 180,
            latitude:
              (Math.atan(
                Math.exp((view.getCenter()![1] / 20037508.34) * Math.PI),
              ) *
                360) /
                Math.PI -
              90,
            zoom: view.getZoom()! - 1,
            pitch: 45,
            bearing: 0,
          },
          controller: false, // Let OpenLayers handle controls
          layers: [
            new GeoJsonLayer({
              id: 'buildings-3d',
              data: geoJsonData,
              extruded: true,
              wireframe: true,
              getElevation: (d: any) => d.properties.height || 10,
              getFillColor: (d: any) => {
                const color = d.properties.wallColor || 'gray';
                return this.colorToRgb(color);
              },
              getLineColor: [80, 80, 80],
              lineWidthMinPixels: 1,
            }),
          ],
        });

        // Sync deck.gl view with OpenLayers map
        const updateDeckView = () => {
          if (!this.deckOverlay || !this.map) return;

          const view = this.map.getView();
          const center = view.getCenter()!;
          const zoom = view.getZoom()!;
          const rotation = view.getRotation();

          // Convert OpenLayers Web Mercator to lon/lat
          const lon = (center[0] / 20037508.34) * 180;
          const lat =
            (Math.atan(Math.exp((center[1] / 20037508.34) * Math.PI)) * 360) /
              Math.PI -
            90;

          this.deckOverlay.setProps({
            viewState: {
              longitude: lon,
              latitude: lat,
              zoom: zoom - 1,
              pitch: 45,
              bearing: -(rotation * 180) / Math.PI,
            },
          });
        };

        // Listen to map movements
        this.map.on('moveend', updateDeckView);
        this.map.getView().on('change:rotation', updateDeckView);

        this.buildings3DEnabled = true;
        console.log('3D extruded buildings loaded with deck.gl (OpenLayers)');
      })
      .catch((error) => {
        console.error('Error loading buildings GeoJSON:', error);
      });
  }

  disable3DBuildings(): void {
    if (this.deckOverlay) {
      this.deckOverlay.finalize();
      this.deckOverlay = undefined;
    }
    if (this.deckContainer) {
      this.deckContainer.remove();
      this.deckContainer = undefined;
    }
    this.buildings3DEnabled = false;
    console.log('3D extruded buildings disabled (OpenLayers + deck.gl)');
  }

  private colorToRgb(color: string): [number, number, number, number] {
    const colorMap: Record<string, [number, number, number, number]> = {
      red: [255, 0, 0, 200],
      black: [40, 40, 40, 200],
      white: [255, 255, 255, 200],
      gray: [136, 136, 136, 200],
      grey: [136, 136, 136, 200],
      blue: [0, 0, 255, 200],
      green: [0, 255, 0, 200],
    };

    return colorMap[color.toLowerCase()] || [136, 136, 136, 200];
  }

  is3DEnabled(): boolean {
    return this.buildings3DEnabled;
  }
}
