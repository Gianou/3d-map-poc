import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThreeDService } from '../../../services/three-d.service';

@Component({
  selector: 'app-leaflet-3d-panel',
  imports: [CommonModule],
  templateUrl: './leaflet-3d-panel.component.html',
  styleUrl: './leaflet-3d-panel.component.css',
})
export class Leaflet3DPanelComponent {
  threeDService = inject(ThreeDService);

  onToggleBuildings(): void {
    this.threeDService.toggleBuildings();
  }
}
