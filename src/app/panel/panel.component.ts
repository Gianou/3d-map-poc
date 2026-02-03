import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThreeDLayerPanelComponent } from './3d-layer-panel/3d-layer-panel.component';
import { GeoserverPanelComponent } from './geoserver-panel/geoserver-panel.component';

@Component({
  selector: 'app-panel',
  imports: [CommonModule, GeoserverPanelComponent, ThreeDLayerPanelComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css',
})
export class PanelComponent {
  title = 'Control Panel';
}
