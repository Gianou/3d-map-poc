import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { LayerService } from '../../../services/layer.service';
import { LeafletOSMProvider } from '../../../services/map-providers/leaflet-osm.provider';

// Declare OSMBuildings from global scope
declare var OSMBuildings: any;

@Component({
  selector: 'app-leaflet-3d-panel',
  imports: [CommonModule],
  templateUrl: './leaflet-3d-panel.component.html',
  styleUrl: './leaflet-3d-panel.component.css',
})
export class Leaflet3DPanelComponent {
  private layerService = inject(LayerService);

  buildingsEnabled = signal<boolean>(false);
  private osmBuildings?: any;

  private get provider(): LeafletOSMProvider | undefined {
    const currentProvider = this.layerService.getMapProvider();
    return currentProvider instanceof LeafletOSMProvider
      ? currentProvider
      : undefined;
  }

  private get map(): any {
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

  private enable3DBuildings(): void {
    if (!this.osmBuildings) {
      this.initOSMBuildings();
    }

    if (!this.osmBuildings) {
      console.error('OSM Buildings library not available');
      return;
    }

    try {
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
    } catch (error) {
      console.error('Error enabling 3D buildings:', error);
    }
  }

  private disable3DBuildings(): void {
    if (this.osmBuildings) {
      try {
        this.osmBuildings.set({ type: 'FeatureCollection', features: [] });
        console.log('3D buildings disabled');
      } catch (error) {
        console.error('Error disabling 3D buildings:', error);
      }
    }
  }
}
