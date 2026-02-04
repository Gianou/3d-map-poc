import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
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

  async onToggleMapTilerBuildings(): Promise<void> {
    const provider = this.provider;
    if (!provider) return;

    if (this.mapTilerBuildingsEnabled()) {
      provider.disable3DBuildings();
      this.mapTilerBuildingsEnabled.set(false);
    } else {
      provider.enable3DBuildings();
      this.mapTilerBuildingsEnabled.set(true);
    }
  }

  async onToggleLocalBuildings(): Promise<void> {
    const provider = this.provider;
    if (!provider) return;

    if (this.localBuildingsEnabled()) {
      provider.disableLocalBuildings3D();
      this.localBuildingsEnabled.set(false);
    } else {
      await provider.enableLocalBuildings3D();
      this.localBuildingsEnabled.set(true);
    }
  }
}
