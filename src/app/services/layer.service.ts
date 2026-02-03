import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal } from '@angular/core';
import * as L from 'leaflet';
import { environment } from '../../environments/environment';

// Declare OSMBuildings from global scope
declare var OSMBuildings: any;

export interface Layer {
  name: string;
  title: string;
  abstract?: string;
  enabled: boolean;
  type: 'vector' | 'raster' | 'unknown';
  wmsLayer?: L.TileLayer.WMS;
  geoJsonLayer?: L.GeoJSON;
}

@Injectable({
  providedIn: 'root',
})
export class LayerService {
  private gsApiUrl = `${environment.geoserverUrl}/geoserver/wms?request=GetCapabilities&service=WMS&version=1.3.0`;
  private map?: L.Map;
  private osmBuildings?: any;

  layers = signal<Layer[]>([]);
  buildingsEnabled = signal<boolean>(false);

  constructor(private http: HttpClient) {
    // Effect to handle layer visibility changes
    effect(() => {
      const currentLayers = this.layers();
      if (!this.map) return;

      currentLayers.forEach((layer) => {
        const hasLayer = layer.wmsLayer || layer.geoJsonLayer;
        if (layer.enabled && !hasLayer) {
          // Add layer to map
          this.addLayerToMap(layer);
        } else if (!layer.enabled && hasLayer) {
          // Remove layer from map
          this.removeLayerFromMap(layer);
        }
      });
    });
  }

  setMap(map: L.Map): void {
    this.map = map;
    this.initOSMBuildings();
  }

  fetchLayers(): void {
    this.http.get(this.gsApiUrl, { responseType: 'text' }).subscribe({
      next: (response) => {
        const layers = this.parseWMSCapabilities(response);
        this.layers.set(layers);
      },
      error: (error) => {
        console.error('Error fetching layers:', error);
        this.layers.set([]);
      },
    });
  }

  private parseWMSCapabilities(xml: string): Layer[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    const layersMap = new Map<string, Layer>();

    // Get all Layer elements
    const layerElements = xmlDoc.getElementsByTagName('Layer');

    for (let i = 0; i < layerElements.length; i++) {
      const layerElement = layerElements[i];

      // Only get direct child Name element (not nested ones)
      const directChildren = Array.from(layerElement.children);
      const nameElement = directChildren.find(
        (child) => child.tagName === 'Name',
      ) as Element | undefined;

      if (!nameElement || !nameElement.textContent) {
        continue;
      }

      const layerName = nameElement.textContent;

      // Skip if we've already processed this layer
      if (layersMap.has(layerName)) {
        continue;
      }

      const titleElement = directChildren.find(
        (child) => child.tagName === 'Title',
      ) as Element | undefined;
      const abstractElement = directChildren.find(
        (child) => child.tagName === 'Abstract',
      ) as Element | undefined;
      const layerType = this.detectLayerType(layerElement);

      layersMap.set(layerName, {
        name: layerName,
        title: titleElement?.textContent || layerName,
        abstract: abstractElement?.textContent || '',
        enabled: false,
        type: layerType,
      });
    }

    return Array.from(layersMap.values());
  }

  private detectLayerType(
    layerElement: Element,
  ): 'vector' | 'raster' | 'unknown' {
    // Check keywords for 'features' which typically indicates vector data
    const keywords = layerElement.getElementsByTagName('Keyword');
    for (let i = 0; i < keywords.length; i++) {
      if (keywords[i].textContent === 'features') {
        return 'vector';
      }
    }

    // Check style names for geometric types (point, line, polygon)
    const styles = layerElement.getElementsByTagName('Style');
    for (let i = 0; i < styles.length; i++) {
      const styleName = styles[i]
        .getElementsByTagName('Name')[0]
        ?.textContent?.toLowerCase();
      if (styleName) {
        if (
          styleName.includes('point') ||
          styleName.includes('line') ||
          styleName.includes('polygon') ||
          styleName === 'generic'
        ) {
          return 'vector';
        }
      }
    }

    // If we have a legend URL with large dimensions, likely raster
    const legendURL = layerElement.getElementsByTagName('LegendURL')[0];
    if (legendURL) {
      const width = parseInt(legendURL.getAttribute('width') || '0');
      const height = parseInt(legendURL.getAttribute('height') || '0');
      // Large legends often indicate raster/continuous data
      if (height > 100) {
        return 'raster';
      }
    }

    return 'unknown';
  }

  toggleLayer(index: number): void {
    const currentLayers = this.layers();
    const updatedLayers = [...currentLayers];
    updatedLayers[index] = {
      ...updatedLayers[index],
      enabled: !updatedLayers[index].enabled,
    };
    this.layers.set(updatedLayers);
  }

  private addLayerToMap(layer: Layer): void {
    if (!this.map) return;

    if (layer.name.toLowerCase().includes('pantagruel')) {
      // Add layers with "pantagruel" in the name as GeoJSON
      this.addGeoJsonLayer(layer);
    } else {
      // Add other layers as WMS
      const wmsLayer = L.tileLayer.wms(
        `${environment.geoserverUrl}/geoserver/wms`,
        {
          layers: layer.name,
          format: 'image/png',
          transparent: true,
          version: '1.3.0',
          attribution: layer.title,
        },
      );

      wmsLayer.addTo(this.map);

      // Update the layer with the WMS reference
      const currentLayers = this.layers();
      const index = currentLayers.findIndex((l) => l.name === layer.name);
      if (index !== -1) {
        const updatedLayers = [...currentLayers];
        updatedLayers[index] = { ...updatedLayers[index], wmsLayer };
        this.layers.set(updatedLayers);
      }
    }
  }

  private removeLayerFromMap(layer: Layer): void {
    if (!this.map) return;

    if (layer.wmsLayer) {
      this.map.removeLayer(layer.wmsLayer);
    }
    if (layer.geoJsonLayer) {
      this.map.removeLayer(layer.geoJsonLayer);
    }

    // Update the layer to remove layer references
    const currentLayers = this.layers();
    const index = currentLayers.findIndex((l) => l.name === layer.name);
    if (index !== -1) {
      const updatedLayers = [...currentLayers];
      updatedLayers[index] = {
        ...updatedLayers[index],
        wmsLayer: undefined,
        geoJsonLayer: undefined,
      };
      this.layers.set(updatedLayers);
    }
  }

  private addGeoJsonLayer(layer: Layer): void {
    if (!this.map) return;

    // Extract workspace and layer name from the full layer name (e.g., "workspace:layername")
    const [workspace, layerName] = layer.name.includes(':')
      ? layer.name.split(':')
      : ['', layer.name];

    const wfsUrl =
      `${environment.geoserverUrl}/geoserver/wfs?` +
      `service=WFS&` +
      `version=2.0.0&` +
      `request=GetFeature&` +
      `typeName=${layer.name}&` +
      `outputFormat=application/json`;

    this.http.get(wfsUrl).subscribe({
      next: (geoJsonData: any) => {
        if (!this.map) return;

        const geoJsonLayer = L.geoJSON(geoJsonData, {
          style: () => ({
            color: '#3388ff',
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.4,
          }),
          onEachFeature: (feature, featureLayer) => {
            // Add popup with feature properties
            if (feature.properties) {
              const popupContent = Object.entries(feature.properties)
                .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
                .join('<br>');
              featureLayer.bindPopup(popupContent);
            }
          },
        });

        geoJsonLayer.addTo(this.map!);

        // Update the layer with the GeoJSON reference
        const currentLayers = this.layers();
        const index = currentLayers.findIndex((l) => l.name === layer.name);
        if (index !== -1) {
          const updatedLayers = [...currentLayers];
          updatedLayers[index] = { ...updatedLayers[index], geoJsonLayer };
          this.layers.set(updatedLayers);
        }
      },
      error: (error) => {
        console.error(`Error fetching GeoJSON for layer ${layer.name}:`, error);
      },
    });
  }

  initOSMBuildings(): void {
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
      // Remove buildings layer
      if (this.map && this.osmBuildings._layer) {
        this.map.removeLayer(this.osmBuildings._layer);
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
