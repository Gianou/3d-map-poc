import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  effect,
  inject,
  OnDestroy,
} from '@angular/core';
import { LayerService } from '../services/layer.service';
import { MapFactoryService } from '../services/map-factory.service';
import { I3DProvider, IMapProvider } from '../services/map-provider.interface';
import { MapStateService } from '../services/map-state.service';
import { OsmBuildingsService } from '../services/osm-buildings.service';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private mapProvider?: IMapProvider & I3DProvider;
  private layerService = inject(LayerService);
  private osmBuildingsService = inject(OsmBuildingsService);
  private mapFactory = inject(MapFactoryService);
  private mapStateService = inject(MapStateService);

  constructor() {
    // Watch for technology changes and reinitialize map
    effect(() => {
      const tech = this.mapStateService.currentTechnology();
      console.log('Technology changed to:', tech);

      // Only reinitialize if the map already exists
      if (this.mapProvider) {
        this.reinitializeMap();
      }
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    if (this.mapProvider) {
      this.mapProvider.destroy();
    }
  }

  private initMap(): void {
    // Create the appropriate provider
    this.mapProvider = this.mapFactory.createMapProvider();

    // Initialize the map
    this.mapProvider.initialize('map', [46.28315, 7.5385], 17);

    // Pass the provider to services
    this.layerService.setMapProvider(this.mapProvider);
    this.osmBuildingsService.setProvider(this.mapProvider);
  }

  private reinitializeMap(): void {
    // Destroy existing map
    if (this.mapProvider) {
      this.mapProvider.destroy();
    }

    // Small timeout to ensure DOM cleanup
    setTimeout(() => {
      this.initMap();
    }, 100);
  }
}
