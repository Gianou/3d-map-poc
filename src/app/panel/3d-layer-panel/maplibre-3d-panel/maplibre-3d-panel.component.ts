import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Map as MapLibreMap } from 'maplibre-gl';
import { LayerService } from '../../../services/layer.service';
import { MapLibreProvider } from '../../../services/map-providers/maplibre.provider';

@Component({
  selector: 'app-maplibre-3d-panel',
  imports: [CommonModule],
  templateUrl: './maplibre-3d-panel.component.html',
  styleUrl: './maplibre-3d-panel.component.css',
})
export class MapLibre3DPanelComponent {
  private layerService = inject(LayerService);

  mapTilerBuildingsEnabled = signal<boolean>(false);
  localBuildingsEnabled = signal<boolean>(false);

  private get provider(): MapLibreProvider | undefined {
    const currentProvider = this.layerService.getMapProvider();
    return currentProvider instanceof MapLibreProvider
      ? currentProvider
      : undefined;
  }

  private get map(): MapLibreMap | undefined {
    return this.provider?.getMapInstance();
  }

  async onToggleMapTilerBuildings(): Promise<void> {
    if (this.mapTilerBuildingsEnabled()) {
      this.disableMapTilerBuildings();
      this.mapTilerBuildingsEnabled.set(false);
    } else {
      this.enableMapTilerBuildings();
      this.mapTilerBuildingsEnabled.set(true);
    }
  }

  async onToggleLocalBuildings(): Promise<void> {
    if (this.localBuildingsEnabled()) {
      this.disableLocalBuildings();
      this.localBuildingsEnabled.set(false);
    } else {
      await this.enableLocalBuildings();
      this.localBuildingsEnabled.set(true);
    }
  }

  private enableMapTilerBuildings(): void {
    if (!this.map) return;

    const layers = this.map.getStyle().layers;
    const labelLayerId = layers?.find((layer) => layer.type === 'symbol')?.id;

    if (!this.map.getSource('openmaptiles')) {
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

    console.log('3D buildings enabled (MapLibre)');
  }

  private disableMapTilerBuildings(): void {
    if (this.map && this.map.getLayer('3d-buildings')) {
      this.map.removeLayer('3d-buildings');
      console.log('3D buildings disabled (MapLibre)');
    }
  }

  private async enableLocalBuildings(): Promise<void> {
    if (!this.map) return;

    try {
      const response = await fetch('/data/buildings.geojson');
      const geojsonData = await response.json();

      if (!this.map.getSource('local-buildings')) {
        this.map.addSource('local-buildings', {
          type: 'geojson',
          data: geojsonData,
        });
      }

      if (!this.map.getLayer('local-buildings-3d')) {
        this.map.addLayer({
          id: 'local-buildings-3d',
          type: 'fill-extrusion',
          source: 'local-buildings',
          paint: {
            'fill-extrusion-color': ['get', 'wallColor'],
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'minHeight'],
            'fill-extrusion-opacity': 0.8,
          },
        });
      }

      console.log('Local 3D buildings enabled (MapLibre)');
    } catch (error) {
      console.error('Error loading local buildings:', error);
    }
  }

  private disableLocalBuildings(): void {
    if (!this.map) return;

    if (this.map.getLayer('local-buildings-3d')) {
      this.map.removeLayer('local-buildings-3d');
    }
    if (this.map.getSource('local-buildings')) {
      this.map.removeSource('local-buildings');
    }

    console.log('Local 3D buildings disabled (MapLibre)');
  }
}
