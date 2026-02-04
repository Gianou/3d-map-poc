import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './map/map.component';
import { PanelComponent } from './panel/panel.component';
import { MapTechnology } from './services/map-provider.interface';
import { MapStateService } from './services/map-state.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PanelComponent, MapComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('3d-map-poc');
  private mapStateService = inject(MapStateService);

  currentTech = this.mapStateService.currentTechnology;

  onTechChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const tech = select.value as MapTechnology;
    this.mapStateService.setTechnology(tech);
  }
}
