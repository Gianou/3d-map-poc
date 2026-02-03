import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OsmBuildingsService } from '../../services/osm-buildings.service';

@Component({
  selector: 'app-3d-layer-panel',
  imports: [CommonModule],
  templateUrl: './3d-layer-panel.component.html',
  styleUrl: './3d-layer-panel.component.css',
})
export class ThreeDLayerPanelComponent {
  osmBuildingsService = inject(OsmBuildingsService);

  onToggleBuildings(): void {
    this.osmBuildingsService.toggleBuildings();
  }
}
