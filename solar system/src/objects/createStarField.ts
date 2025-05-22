import * as Three from 'three';
// Зоряне поле – збільшено до 12000 одиниць, щоб охопити всю сцену
export function createStarField(textureLoader: Three.TextureLoader): Three.Mesh {
  const geometry = new Three.SphereGeometry(91000, 32, 32);
  const texture = textureLoader.load('/images/stars.jpg');
  const material = new Three.MeshBasicMaterial({ map: texture, side: Three.BackSide });
  return new Three.Mesh(geometry, material);
}