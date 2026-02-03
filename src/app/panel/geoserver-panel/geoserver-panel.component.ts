import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { LayerService } from '../../services/layer.service';

@Component({
  selector: 'app-geoserver-panel',
  imports: [CommonModule],
  templateUrl: './geoserver-panel.component.html',
  styleUrl: './geoserver-panel.component.css',
})
export class GeoserverPanelComponent implements OnInit {
  layerService = inject(LayerService);

  ngOnInit(): void {
    this.layerService.fetchLayers();
  }

  onToggleLayer(index: number): void {
    this.layerService.toggleLayer(index);
  }
}
