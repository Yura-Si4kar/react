import * as Three from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function initializeThree() {
  const scene = new Three.Scene();
  const camera = new Three.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    110999
  );
  camera.position.set(0, 100, 500);

  const renderer = new Three.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  // Додаємо рендерер у контейнер
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 10;
  controls.maxDistance = 14999;

  const textureLoader = new Three.TextureLoader();

  return { scene, camera, renderer, controls, textureLoader };
}