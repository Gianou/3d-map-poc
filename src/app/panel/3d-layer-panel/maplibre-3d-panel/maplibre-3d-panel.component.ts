import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThreeDService } from '../../../services/three-d.service';

@Component({
  selector: 'app-maplibre-3d-panel',
  imports: [CommonModule],
  templateUrl: './maplibre-3d-panel.component.html',
  styleUrl: './maplibre-3d-panel.component.css',
})
export class MapLibre3DPanelComponent {
  threeDService = inject(ThreeDService);

  onToggleBuildings(): void {
    this.threeDService.toggleBuildings();
  }
}
