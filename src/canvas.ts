import { Pane } from 'tweakpane';
import {
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';

const DEBUG_MODE = true;
const RESOURCE_DIRECTORY = './resource/';

export class Core {
  private canvas: HTMLCanvasElement;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private viewer: GaussianSplats3D.Viewer;
  private resourceDirectory: string;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.renderer = new WebGLRenderer({antialias: true, canvas: this.canvas});
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100.0);
    this.camera.position.set(0.0, 0.0, 5.0);
    this.camera.up.set(0.0, -1.0, 0.0);
    this.camera.lookAt(new Vector3(0.0, 0.0, 0.0));

    this.viewer = new GaussianSplats3D.Viewer({
      renderer: this.renderer,
      threeScene: this.scene,
      camera: this.camera,
      sharedMemoryForWorkers: false,
    });

    this.resourceDirectory = RESOURCE_DIRECTORY;
  }
  async load(filePath: string): Promise<void> {
    const path = this.resourceDirectory + filePath;
    await this.viewer.addSplatScene(path);
  }
  start(): void {
    this.viewer.start();
  }
  setResourceDirectory(path: string): void {
    this.resourceDirectory = path;
  }
}
