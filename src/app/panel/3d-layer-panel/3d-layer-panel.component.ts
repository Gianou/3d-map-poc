import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LayerService } from '../../services/layer.service';

@Component({
  selector: 'app-3d-layer-panel',
  imports: [CommonModule],
  templateUrl: './3d-layer-panel.component.html',
  styleUrl: './3d-layer-panel.component.css',
})
export class ThreeDLayerPanelComponent {
  layerService = inject(LayerService);

  onToggleBuildings(): void {
    this.layerService.toggleBuildings();
  }
}
