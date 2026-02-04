import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThreeDService } from '../../../services/three-d.service';

@Component({
  selector: 'app-openlayers-3d-panel',
  imports: [CommonModule],
  templateUrl: './openlayers-3d-panel.component.html',
  styleUrl: './openlayers-3d-panel.component.css',
})
export class OpenLayers3DPanelComponent {
  threeDService = inject(ThreeDService);
}
