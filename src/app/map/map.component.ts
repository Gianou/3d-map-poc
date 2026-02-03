import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import * as L from 'leaflet';
import { LayerService } from '../services/layer.service';
import { OsmBuildingsService } from '../services/osm-buildings.service';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  private layerService = inject(LayerService);
  private osmBuildingsService = inject(OsmBuildingsService);

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [46.28315, 7.5385], // Centered on buildings location
      zoom: 17,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    // Pass the map reference to services
    this.layerService.setMap(this.map);
    this.osmBuildingsService.setMap(this.map);
  }
}
