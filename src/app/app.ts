import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './map/map.component';
import { PanelComponent } from './panel/panel.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PanelComponent, MapComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('3d-map-poc');
}
