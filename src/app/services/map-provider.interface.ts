export type MapTechnology = 'leaflet-osm' | 'openlayers' | 'maplibre';

export interface MapLayer {
  id: string;
  visible: boolean;
}

export interface WMSLayerOptions {
  url: string;
  layers: string;
  format?: string;
  transparent?: boolean;
  version?: string;
  attribution?: string;
}

export interface GeoJSONLayerOptions {
  style?: any;
  onEachFeature?: (feature: any, layer: any) => void;
}

export interface IMapProvider {
  /**
   * Initialize the map in a given container
   */
  initialize(containerId: string, center: [number, number], zoom: number): void;

  /**
   * Destroy the map instance and cleanup
   */
  destroy(): void;

  /**
   * Add a WMS layer to the map
   */
  addWMSLayer(id: string, options: WMSLayerOptions): void;

  /**
   * Remove a WMS layer from the map
   */
  removeWMSLayer(id: string): void;

  /**
   * Add a GeoJSON layer to the map
   */
  addGeoJSONLayer(id: string, data: any, options?: GeoJSONLayerOptions): void;

  /**
   * Remove a GeoJSON layer from the map
   */
  removeGeoJSONLayer(id: string): void;

  /**
   * Set the map center and zoom
   */
  setView(center: [number, number], zoom: number): void;

  /**
   * Get the current map instance (library-specific)
   */
  getMapInstance(): any;
}
