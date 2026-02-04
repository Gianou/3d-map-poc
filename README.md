# 3D Map POC - Multi-Library Demo

A proof-of-concept Angular application demonstrating runtime switching between multiple map libraries with support for raster layers, GeoJSON, and 3D capabilities.

## Features

- **Runtime Library Switching**: Switch between map technologies without rebuilding
- **Multiple Map Libraries**:
  - Leaflet + OSM Buildings
  - OpenLayers
  - MapLibre GL
- **Unified API**: Abstract provider pattern for consistent layer management
- **Layer Support**:
  - WMS layers from GeoServer
  - GeoJSON layers
  - 3D buildings (library-specific implementations)

## Architecture

### Provider Pattern

The application uses an abstraction layer to support multiple mapping libraries:

```
services/
├── map-provider.interface.ts    # IMapProvider & I3DProvider interfaces
├── map-state.service.ts         # Global state for current technology
├── map-factory.service.ts       # Creates the appropriate provider
├── layer.service.ts             # Layer management using IMapProvider
├── osm-buildings.service.ts     # 3D building management
└── map-providers/
    ├── leaflet-osm.provider.ts  # Leaflet implementation
    ├── openlayers.provider.ts   # OpenLayers implementation
    └── maplibre.provider.ts     # MapLibre GL implementation
```

### Key Components

- **MapComponent**: Manages map lifecycle, responds to technology changes
- **PanelComponent**: UI for layer and settings controls
- **GeoserverPanelComponent**: WMS layer discovery and toggling
- **3DLayerPanelComponent**: 3D building controls

### Technology Switching Flow

1. User selects technology from dropdown
2. `MapStateService` updates the current technology signal
3. `MapComponent` detects change via effect
4. Old map provider is destroyed
5. `MapFactoryService` creates new provider
6. Map is reinitialized with new provider
7. Services receive new provider instance

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
