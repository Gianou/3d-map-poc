import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { IMapProvider } from './map-provider.interface';

export interface Layer {
  name: string;
  title: string;
  abstract?: string;
  enabled: boolean;
  type: 'vector' | 'raster' | 'unknown';
  isActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LayerService {
  private gsApiUrl = `${environment.geoserverUrl}/geoserver/wms?request=GetCapabilities&service=WMS&version=1.3.0`;
  private mapProvider?: IMapProvider;

  layers = signal<Layer[]>([]);

  constructor(private http: HttpClient) {
    // Effect to handle layer visibility changes
    effect(() => {
      const currentLayers = this.layers();
      if (!this.mapProvider) return;

      currentLayers.forEach((layer) => {
        if (layer.enabled && !layer.isActive) {
          // Add layer to map
          this.addLayerToMap(layer);
        } else if (!layer.enabled && layer.isActive) {
          // Remove layer from map
          this.removeLayerFromMap(layer);
        }
      });
    });
  }

  setMapProvider(provider: IMapProvider): void {
    this.mapProvider = provider;

    // Reset all layers when provider changes
    const currentLayers = this.layers();
    if (currentLayers.length > 0) {
      const resetLayers = currentLayers.map((layer) => ({
        ...layer,
        isActive: false,
        enabled: false,
      }));
      this.layers.set(resetLayers);
    }
  }

  getMapProvider(): IMapProvider | undefined {
    return this.mapProvider;
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
        isActive: false,
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
    if (!this.mapProvider) return;

    if (layer.name.toLowerCase().includes('pantagruel')) {
      // Add layers with "pantagruel" in the name as GeoJSON
      this.addGeoJsonLayer(layer);
    } else {
      // Add other layers as WMS
      this.mapProvider.addWMSLayer(layer.name, {
        url: `${environment.geoserverUrl}/geoserver/wms`,
        layers: layer.name,
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        attribution: layer.title,
      });

      // Update the layer status
      this.updateLayerStatus(layer.name, true);
    }
  }

  private removeLayerFromMap(layer: Layer): void {
    if (!this.mapProvider) return;

    if (layer.name.toLowerCase().includes('pantagruel')) {
      this.mapProvider.removeGeoJSONLayer(layer.name);
    } else {
      this.mapProvider.removeWMSLayer(layer.name);
    }

    // Update the layer status
    this.updateLayerStatus(layer.name, false);
  }

  private updateLayerStatus(layerName: string, isActive: boolean): void {
    const currentLayers = this.layers();
    const index = currentLayers.findIndex((l) => l.name === layerName);
    if (index !== -1) {
      const updatedLayers = [...currentLayers];
      updatedLayers[index] = { ...updatedLayers[index], isActive };
      this.layers.set(updatedLayers);
    }
  }

  private addGeoJsonLayer(layer: Layer): void {
    if (!this.mapProvider) return;

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
        if (!this.mapProvider) return;

        this.mapProvider.addGeoJSONLayer(layer.name, geoJsonData, {
          style: () => ({
            color: '#3388ff',
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.4,
          }),
          onEachFeature: (feature: any, featureLayer: any) => {
            // Add popup with feature properties
            if (feature.properties) {
              const popupContent = Object.entries(feature.properties)
                .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
                .join('<br>');
              // Note: Popup handling varies by library, this is a placeholder
              console.log('Feature clicked:', popupContent);
            }
          },
        });

        // Update the layer status
        this.updateLayerStatus(layer.name, true);
      },
      error: (error) => {
        console.error(`Error fetching GeoJSON for layer ${layer.name}:`, error);
      },
    });
  }
}
