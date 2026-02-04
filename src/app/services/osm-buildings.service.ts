import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { I3DProvider } from './map-provider.interface';

@Injectable({
  providedIn: 'root',
})
export class OsmBuildingsService {
  private provider?: I3DProvider;

  buildingsEnabled = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  setProvider(provider: I3DProvider): void {
    this.provider = provider;
    // Reset state when provider changes
    this.buildingsEnabled.set(false);
  }

  toggleBuildings(): void {
    if (!this.provider) {
      console.error('No 3D provider available');
      return;
    }

    const currentState = this.buildingsEnabled();
    this.buildingsEnabled.set(!currentState);

    if (this.buildingsEnabled()) {
      this.provider.enable3DBuildings();
      console.log('3D Buildings layer enabled');
    } else {
      this.provider.disable3DBuildings();
      console.log('3D Buildings layer disabled');
    }
  }
}
