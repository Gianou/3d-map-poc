import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MapStateService } from '../../services/map-state.service';
import { Leaflet3DPanelComponent } from './leaflet-3d-panel/leaflet-3d-panel.component';
import { MapLibre3DPanelComponent } from './maplibre-3d-panel/maplibre-3d-panel.component';
import { OpenLayers3DPanelComponent } from './openlayers-3d-panel/openlayers-3d-panel.component';

@Component({
  selector: 'app-3d-layer-panel',
  imports: [
    CommonModule,
    Leaflet3DPanelComponent,
    OpenLayers3DPanelComponent,
    MapLibre3DPanelComponent,
  ],
  templateUrl: './3d-layer-panel.component.html',
  styleUrl: './3d-layer-panel.component.css',
})
export class ThreeDLayerPanelComponent {
  mapStateService = inject(MapStateService);
  currentTech = this.mapStateService.currentTechnology;
}
