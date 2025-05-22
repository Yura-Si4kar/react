import * as Three from 'three';
import { Planet as PlanetsTypes } from '../types/type';
// Створення планети із півотом для обертання навколо Сонця
export function createPlanet(planet: PlanetsTypes, textureLoader: Three.TextureLoader) {
  const pivot = new Three.Object3D();
  const geometry = new Three.SphereGeometry(planet.radius, 16, 16);
  const texture = textureLoader.load(planet.texture);
  const material = new Three.MeshStandardMaterial({ map: texture });
  const mesh = new Three.Mesh(geometry, material);
  // Планета розміщується на відстані від Сонця
  mesh.position.set(planet.distance, 0, 0);
  // Застосовуємо осьовий нахил
  mesh.rotation.z = Three.MathUtils.degToRad(planet.axisTilt);
  pivot.add(mesh);
  return { pivot, mesh };
}