import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import * as L from 'leaflet';
import { LayerService } from '../services/layer.service';

@Component({
    selector: 'app-map',
    imports: [CommonModule],
    templateUrl: './map.component.html',
    styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  private layerService = inject(LayerService);

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [46.2044, 6.1432], // Centered on Geneva, Switzerland
      zoom: 13,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    // Pass the map reference to the layer service
    this.layerService.setMap(this.map);
  }
}
