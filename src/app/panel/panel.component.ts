import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { LayerService } from '../services/layer.service';

@Component({
    selector: 'app-panel',
    imports: [CommonModule],
    templateUrl: './panel.component.html',
    styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {
  title = 'Control Panel';
  layerService = inject(LayerService);

  ngOnInit(): void {
    this.layerService.fetchLayers();
  }

  onToggleLayer(index: number): void {
    this.layerService.toggleLayer(index);
  }
}
