# 3D Map Visualization - Proof of Concept Report

## Introduction

This report evaluates open-source web mapping libraries to determine the best solution for implementing 3D building visualization in the Visualization_tool. The evaluation focuses on libraries that can meet current 2D requirements while providing viable 3D capabilities.

## Preliminary Research

Initial research identified several web mapping solutions:

| Library      | 2D  | 3D  | WebGL | GIS depth | Vendor lock | Open-source | Notes                                            |
| ------------ | --- | --- | ----- | --------- | ----------- | ----------- | ------------------------------------------------ |
| Leaflet      | ✅   | ❌   | ❌     | Medium    | None        | ✅           | Lightweight, classic                             |
| OpenLayers   | ✅   | ⚠️   | ⚠️     | High      | None        | ✅           | GIS-heavy                                        |
| MapLibre GL  | ✅   | ⚠️   | ✅     | Medium    | None        | ✅           | Modern WebGL                                     |
| Mapbox GL    | ✅   | ⚠️   | ✅     | Medium    | High        | ❌           | Proprietary                                      |
| ArcGIS JS    | ✅   | ✅   | ✅     | Very High | Very High   | ❌           | Proprietary                                      |
| CesiumJS     | ⚠️   | ✅   | ✅     | High (3D) | Medium      | ✅           | 3D globe, relies on Cesium ION (not open-source) |
| OSMBuildings | ⚠️   | ✅   | ✅     | Low       | None        | ✅           | Standalone or Leaflet layer                      |
| Deck.GL      | N/A | N/A | ✅     | N/A       | None        | ✅           | Not a map, visualization layer only              |

Based on open-source requirements, three libraries were selected for detailed evaluation:

- Leaflet
- OpenLayers
- MapLibre GL

## Requirements

**Current**
- Display base map
- Display raster layers
- Display vector layers (GeoJSON)
- Interactive functionality

**Future**
- 3D views of buildings
- Building colors editable or property-based

**Optional**
- Display current 2D layers alongside 3D layers

## Evaluation

### Leaflet

**Current Features**

All current requirements are working and implemented.

**3D Capabilities**

OSM Buildings can be used as a Leaflet layer to display extruded GeoJSON polygons. However, the library is no longer maintained (last update 6 years ago) and has several limitations.

**Assessment**

| Pros                                | Cons                                       |
| ----------------------------------- | ------------------------------------------ |
| Currently used in the project       | OSM Buildings unmaintained for 6 years     |
| GeoJSON polygon extrusion supported | No npm package, requires `<script>` import |
|                                     | Only 2.5D, not true 3D                     |
|                                     | No camera tilt or rotation                 |

### OpenLayers

**Current Features**

Display of raster and vector layers works without issues. 

**3D Capabilities**

3D is not natively supported. OpenLayers can be combined with Deck.GL, but POC tests were not convincing—extruded GeoJSON buildings were not properly anchored to the map. There is no built-in camera control for tilting the view.

3D implementation would require a second library (e.g., CesiumJS), which was not investigated further due to this additional dependency.

**Assessment**

| Pros                                 | Cons                                                |
| ------------------------------------ | --------------------------------------------------- |
| Raster and vector display works well | No native 3D support                                |
| High GIS capabilities                | Deck.GL integration issues (buildings not anchored) |
|                                      | No camera tilt or rotation control                  |
|                                      | Requires additional library for 3D                  |
|                                      | Migration required from Leaflet                     |


### MapLibre GL

**Current Features**

Raster and vector layer display works well. Performance with large GeoJSON files appears smoother than Leaflet (subjective observation).

**3D Capabilities**

MapLibre GL supports polygon extrusion for building visualization. The library supports camera tilt and rotation. Layers with 3D buildings datasets exists but may require tokens.

Additional capabilities include:
- OBJ file loading
- Integration with Deck.GL (hexagon layer tested successfully)
- 3D terrain (requires token)
- Globe projection

**Assessment**

| Pros                                  | Cons                            |
| ------------------------------------- | ------------------------------- |
| Modern WebGL-based rendering          | Migration required from Leaflet |
| Native 3D support with camera control |                                 |
| Better performance with large GeoJSON |                                 |
| Active development and maintenance    |                                 |
| Deck.GL integration available         |                                 |
| OBJ file support                      |                                 |



## Conclusion

Based on the evaluation, **MapLibre GL** is the recommended solution for implementing 3D building visualization. It meets all current 2D requirements while providing native 3D capabilities with camera control, avoiding the need for additional dependencies. The library is actively maintained, offers better performance with large datasets, and provides flexibility for future enhancements through Deck.GL integration and OBJ file support.

## Library Migration Considerations

Migrating from Leaflet to MapLibre GL in the Visualization_tool requires attention to several areas:

- **Drawing functionality**: MapLibre supports polygon drawing via [mapbox-gl-draw](https://maplibre.org/maplibre-gl-js/docs/examples/draw-polygon-with-mapbox-gl-draw/)
- **Pop-ups**: Standard [popup API](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup-on-click/) is available
- **Snapshot format compatibility**: May need adapters or migration
- **Usablility testing**: Map details like attributions may have different styling
- **GeoJSON editing**: Existing editing workflows will need adjustment

**Resources:**
- [MapLibre Leaflet Migration Guide](https://maplibre.org/maplibre-gl-js/docs/guides/leaflet-migration-guide/)
