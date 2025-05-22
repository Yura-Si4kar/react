import * as Three from 'three';
// Сонце – встановлюємо радіус 50 (порівняно з орбітою Землі ≈300)
export function createSun(textureLoader: Three.TextureLoader): Three.Mesh {
  const geometry = new Three.SphereGeometry(100, 32, 32); // Збільшено радіус на 50
  const texture = textureLoader.load('/images/sun.jpg');
  const material = new Three.MeshBasicMaterial({ map: texture, color: 0xffff00 });
  return new Three.Mesh(geometry, material);
}