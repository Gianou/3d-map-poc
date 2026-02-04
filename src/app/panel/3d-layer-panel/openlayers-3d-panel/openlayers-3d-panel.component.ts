import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Deck } from '@deck.gl/core';
import { GeoJsonLayer } from '@deck.gl/layers';
import OLMap from 'ol/Map';
import { LayerService } from '../../../services/layer.service';
import { OpenLayersProvider } from '../../../services/map-providers/openlayers.provider';

@Component({
  selector: 'app-openlayers-3d-panel',
  imports: [CommonModule],
  templateUrl: './openlayers-3d-panel.component.html',
  styleUrl: './openlayers-3d-panel.component.css',
})
export class OpenLayers3DPanelComponent {
  private layerService = inject(LayerService);

  buildingsEnabled = signal<boolean>(false);
  private deckOverlay?: Deck;
  private deckContainer?: HTMLDivElement;

  private get provider(): OpenLayersProvider | undefined {
    const currentProvider = this.layerService.getMapProvider();
    return currentProvider instanceof OpenLayersProvider
      ? currentProvider
      : undefined;
  }

  private get map(): OLMap | undefined {
    return this.provider?.getMapInstance();
  }

  onToggleBuildings(): void {
    if (this.buildingsEnabled()) {
      this.disable3DBuildings();
      this.buildingsEnabled.set(false);
    } else {
      this.enable3DBuildings();
      this.buildingsEnabled.set(true);
    }
  }

  private enable3DBuildings(): void {
    if (!this.map) return;

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

    fetch('/data/buildings.geojson')
      .then((response) => response.json())
      .then((geoJsonData) => {
        if (!this.map || !this.deckContainer) return;

        const view = this.map.getView();

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
          controller: false,
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

        const updateDeckView = () => {
          if (!this.deckOverlay || !this.map) return;

          const view = this.map.getView();
          const center = view.getCenter()!;
          const zoom = view.getZoom()!;
          const rotation = view.getRotation();

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

        this.map.on('moveend', updateDeckView);
        this.map.getView().on('change:rotation', updateDeckView);

        console.log('3D extruded buildings loaded with deck.gl (OpenLayers)');
      })
      .catch((error) => {
        console.error('Error loading buildings GeoJSON:', error);
      });
  }

  private disable3DBuildings(): void {
    if (this.deckOverlay) {
      this.deckOverlay.finalize();
      this.deckOverlay = undefined;
    }
    if (this.deckContainer) {
      this.deckContainer.remove();
      this.deckContainer = undefined;
    }
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
}
