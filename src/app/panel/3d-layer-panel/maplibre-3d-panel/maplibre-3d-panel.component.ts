import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Map as MapLibreMap } from 'maplibre-gl';
import { LayerService } from '../../../services/layer.service';
import { MapLibreProvider } from '../../../services/map-providers/maplibre.provider';

@Component({
  selector: 'app-maplibre-3d-panel',
  imports: [CommonModule],
  templateUrl: './maplibre-3d-panel.component.html',
  styleUrl: './maplibre-3d-panel.component.css',
})
export class MapLibre3DPanelComponent {
  private layerService = inject(LayerService);

  mapTilerBuildingsEnabled = signal<boolean>(false);
  localBuildingsEnabled = signal<boolean>(false);
  terrainEnabled = signal<boolean>(false);
  modelEnabled = signal<boolean>(false);
  cameraControlsEnabled = signal<boolean>(false);
  currentPitch = signal<number>(0);
  currentBearing = signal<number>(0);

  private get provider(): MapLibreProvider | undefined {
    const currentProvider = this.layerService.getMapProvider();
    return currentProvider instanceof MapLibreProvider
      ? currentProvider
      : undefined;
  }

  private get map(): MapLibreMap | undefined {
    return this.provider?.getMapInstance();
  }

  async onToggleMapTilerBuildings(): Promise<void> {
    if (this.mapTilerBuildingsEnabled()) {
      this.disableMapTilerBuildings();
      this.mapTilerBuildingsEnabled.set(false);
    } else {
      this.enableMapTilerBuildings();
      this.mapTilerBuildingsEnabled.set(true);
    }
  }

  async onToggleLocalBuildings(): Promise<void> {
    if (this.localBuildingsEnabled()) {
      this.disableLocalBuildings();
      this.localBuildingsEnabled.set(false);
    } else {
      await this.enableLocalBuildings();
      this.localBuildingsEnabled.set(true);
    }
  }
  onToggleTerrain(): void {
    if (this.terrainEnabled()) {
      this.disableTerrain();
      this.terrainEnabled.set(false);
    } else {
      this.enableTerrain();
      this.terrainEnabled.set(true);
    }
  }

  async onToggleModel(): Promise<void> {
    if (this.modelEnabled()) {
      this.disable3DModel();
      this.modelEnabled.set(false);
    } else {
      await this.enable3DModel();
      this.modelEnabled.set(true);
    }
  }

  onToggleCameraControls(): void {
    if (this.cameraControlsEnabled()) {
      this.disableCameraControls();
      this.cameraControlsEnabled.set(false);
    } else {
      this.enableCameraControls();
      this.cameraControlsEnabled.set(true);
    }
  }

  onPitchChange(event: Event): void {
    const value = +(event.target as HTMLInputElement).value;
    this.currentPitch.set(value);
    if (this.map) {
      this.map.setPitch(value);
    }
  }

  onBearingChange(event: Event): void {
    const value = +(event.target as HTMLInputElement).value;
    this.currentBearing.set(value);
    if (this.map) {
      this.map.setBearing(value);
    }
  }

  onResetCamera(): void {
    if (this.map) {
      this.map.easeTo({
        pitch: 0,
        bearing: 0,
        duration: 1000,
      });
      this.currentPitch.set(0);
      this.currentBearing.set(0);
    }
  }

  onCinematicView(): void {
    if (this.map) {
      this.map.easeTo({
        pitch: 60,
        bearing: -45,
        duration: 1500,
      });
      this.currentPitch.set(60);
      this.currentBearing.set(-45);
    }
  }

  private enableMapTilerBuildings(): void {
    if (!this.map) return;

    const layers = this.map.getStyle().layers;
    const labelLayerId = layers?.find((layer) => layer.type === 'symbol')?.id;

    if (!this.map.getSource('openmaptiles')) {
      this.map.addSource('openmaptiles', {
        type: 'vector',
        url: 'https://api.maptiler.com/tiles/v3/tiles.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
      });
    }

    if (!this.map.getLayer('3d-buildings')) {
      this.map.addLayer(
        {
          id: '3d-buildings',
          source: 'openmaptiles',
          'source-layer': 'building',
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'render_height'],
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'render_min_height'],
            ],
            'fill-extrusion-opacity': 0.6,
          },
        },
        labelLayerId,
      );
    }

    console.log('3D buildings enabled (MapLibre)');
  }

  private disableMapTilerBuildings(): void {
    if (this.map && this.map.getLayer('3d-buildings')) {
      this.map.removeLayer('3d-buildings');
      console.log('3D buildings disabled (MapLibre)');
    }
  }

  private async enableLocalBuildings(): Promise<void> {
    if (!this.map) return;

    try {
      const response = await fetch('/data/buildings.geojson');
      const geojsonData = await response.json();

      if (!this.map.getSource('local-buildings')) {
        this.map.addSource('local-buildings', {
          type: 'geojson',
          data: geojsonData,
        });
      }

      if (!this.map.getLayer('local-buildings-3d')) {
        this.map.addLayer({
          id: 'local-buildings-3d',
          type: 'fill-extrusion',
          source: 'local-buildings',
          paint: {
            'fill-extrusion-color': ['get', 'wallColor'],
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'minHeight'],
            'fill-extrusion-opacity': 0.8,
          },
        });
      }

      console.log('Local 3D buildings enabled (MapLibre)');
    } catch (error) {
      console.error('Error loading local buildings:', error);
    }
  }

  private disableLocalBuildings(): void {
    if (!this.map) return;

    if (this.map.getLayer('local-buildings-3d')) {
      this.map.removeLayer('local-buildings-3d');
    }
    if (this.map.getSource('local-buildings')) {
      this.map.removeSource('local-buildings');
    }

    console.log('Local 3D buildings disabled (MapLibre)');
  }

  private enableCameraControls(): void {
    if (!this.map) return;

    // Enable pitch and rotation interactions
    this.map.dragRotate.enable();
    this.map.touchZoomRotate.enableRotation();

    // Set max pitch to allow tilting
    this.map.setMaxPitch(85);

    console.log('3D camera controls enabled (MapLibre)');
  }

  private disableCameraControls(): void {
    if (!this.map) return;

    // Reset camera to flat view
    this.map.easeTo({
      pitch: 0,
      bearing: 0,
      duration: 500,
    });

    // Disable pitch and rotation interactions
    this.map.dragRotate.disable();
    this.map.touchZoomRotate.disableRotation();

    // Reset max pitch
    this.map.setMaxPitch(0);

    this.currentPitch.set(0);
    this.currentBearing.set(0);

    console.log('3D camera controls disabled (MapLibre)');
  }

  private enableTerrain(): void {
    if (!this.map) return;

    // Add terrain source if it doesn't exist
    if (!this.map.getSource('terrain-source')) {
      this.map.addSource('terrain-source', {
        type: 'raster-dem',
        url: 'https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
        tileSize: 256,
      });
    }

    // Enable terrain
    this.map.setTerrain({
      source: 'terrain-source',
      exaggeration: 1.5,
    });

    // Automatically enable camera controls for better terrain viewing
    if (!this.cameraControlsEnabled()) {
      this.enableCameraControls();
      this.cameraControlsEnabled.set(true);
    }

    console.log('3D terrain enabled (MapLibre)');
  }

  private disableTerrain(): void {
    if (!this.map) return;

    // Disable terrain
    this.map.setTerrain(null);

    console.log('3D terrain disabled (MapLibre)');
  }

  private async enable3DModel(): Promise<void> {
    if (!this.map) return;

    const modelOrigin: [number, number] = [7.538361, 46.283111]; // 7°32'18.1"E, 46°16'59.2"N

    // Automatically enable camera controls for better viewing
    if (!this.cameraControlsEnabled()) {
      this.enableCameraControls();
      this.cameraControlsEnabled.set(true);
    }

    // Pan to the model location and tilt camera
    this.map.flyTo({
      center: modelOrigin,
      pitch: 60,
      bearing: 0,
      duration: 2000,
    });

    // Custom layer for 3D model using Three.js
    const customLayer: any = {
      id: '3d-model',
      type: 'custom',
      renderingMode: '3d',
      onAdd: function (map: any, gl: WebGLRenderingContext) {
        // Dynamically import Three.js
        import('three').then((THREE) => {
          // Store THREE reference in the layer context
          this.THREE = THREE;

          import('three/examples/jsm/loaders/OBJLoader.js').then(
            (OBJLoaderModule) => {
              this.camera = new THREE.Camera();
              this.scene = new THREE.Scene();

              // Add lights
              const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
              directionalLight.position.set(0, -70, 100).normalize();
              this.scene.add(directionalLight);

              const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
              directionalLight2.position.set(0, 70, 100).normalize();
              this.scene.add(directionalLight2);

              const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
              this.scene.add(ambientLight);

              // Load OBJ model
              const loader = new OBJLoaderModule.OBJLoader();
              loader.load(
                '/data/10520_pingpongtable_L2.obj',
                (obj: any) => {
                  // Set material
                  obj.traverse((child: any) => {
                    if (child instanceof THREE.Mesh) {
                      child.material = new THREE.MeshPhongMaterial({
                        color: 0xff0000, // Bright red for visibility
                        shininess: 30,
                      });
                    }
                  });

                  this.scene.add(obj);
                  this.model = obj;
                  console.log('3D model loaded successfully');
                  map.triggerRepaint();
                },
                (progress: any) => {
                  console.log(
                    'Loading model:',
                    ((progress.loaded / progress.total) * 100).toFixed(2) + '%',
                  );
                },
                (error: any) => {
                  console.error('Error loading OBJ model:', error);
                },
              );

              this.map = map;

              // Create renderer
              this.renderer = new THREE.WebGLRenderer({
                canvas: map.getCanvas(),
                context: gl,
                antialias: true,
              });

              this.renderer.autoClear = false;
            },
          );
        });
      },
      render: function (gl: WebGLRenderingContext, args: any) {
        if (!this.THREE || !this.camera || !this.model) return;

        const THREE = this.THREE;

        // Parameters to ensure the model is georeferenced correctly on the map
        const modelAltitude = 0;
        const scaling = 0.05; // Scale for ping pong table size

        // Rotation angles in radians
        const rotateX = Math.PI / 2; // 90 degrees
        const rotateY = Math.PI;
        const rotateZ = 0;

        // Use the official API to get the correct model matrix
        const modelMatrix = this.map.transform.getMatrixForModel(
          modelOrigin,
          modelAltitude,
        );

        // Create rotation matrices
        const rotationX = new THREE.Matrix4().makeRotationX(rotateX);
        const rotationY = new THREE.Matrix4().makeRotationY(rotateY);
        const rotationZ = new THREE.Matrix4().makeRotationZ(rotateZ);

        const m = new THREE.Matrix4().fromArray(
          args.defaultProjectionData.mainMatrix,
        );
        const l = new THREE.Matrix4()
          .fromArray(modelMatrix)
          .scale(new THREE.Vector3(scaling, scaling, scaling))
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ);

        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
      },
    };

    this.map.addLayer(customLayer);

    console.log('3D model layer added at 46°16\'59.2"N 7°32\'18.1"E');
  }

  private disable3DModel(): void {
    if (!this.map) return;

    if (this.map.getLayer('3d-model')) {
      this.map.removeLayer('3d-model');
    }

    console.log('3D model disabled');
  }
}
