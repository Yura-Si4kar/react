import * as Three from 'three';
import { Moon as MoonTypes } from '../types/type';

// Створення супутника – додається як дочірній елемент планети
export function createSatellite(moon: MoonTypes, textureLoader: Three.TextureLoader) {
  const pivot = new Three.Object3D();
  const geometry = new Three.SphereGeometry(moon.radius, 16, 16);
  const texture = textureLoader.load(moon.texture);
  const material = new Three.MeshStandardMaterial({ map: texture });
  const mesh = new Three.Mesh(geometry, material);
  // Супутник розміщується на відстані від планети
  mesh.position.set(moon.distance, 0, 0);
  // Застосовуємо осьовий нахил
  mesh.rotation.z = Three.MathUtils.degToRad(moon.axisTilt);
  pivot.add(mesh);
  return { pivot, mesh };
}