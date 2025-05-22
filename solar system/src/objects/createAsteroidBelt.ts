import * as Three from 'three';
// Пояс астероїдів – залишаємо без змін (за бажанням можна масштабувати)
export function createAsteroidBelt(textureLoader: Three.TextureLoader): Three.Group {
  const group = new Three.Group();
  const asteroidTexture = textureLoader.load('/images/satellites/asteriod.jpg');
  const material = new Three.MeshStandardMaterial({ map: asteroidTexture, color: 0xffffff });
  const count = 5000;
  const innerBelt = 600; // нова внутрішня межа
  const outerBelt = 900; // нова зовнішня межа

  for (let i = 0; i < count; i++) {
    // Змінюємо розміри астероїда (від 0.2 до 1.0)
    const size = 0.2 + Math.random() * 0.8;
    const useDodecahedron = Math.random() < 0.5;
    const geometry = useDodecahedron 
      ? new Three.DodecahedronGeometry(size, 0)
      : new Three.IcosahedronGeometry(size, 0);
    
    const asteroid = new Three.Mesh(geometry, material);
    const angle = Math.random() * Math.PI * 2;
    // Випадкова відстань в межах нового поясу
    const radius = innerBelt + Math.random() * (outerBelt - innerBelt);
    asteroid.position.set(
      radius * Math.cos(angle),
      (Math.random() - 0.5) * 10,
      radius * Math.sin(angle)
    );
    asteroid.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    group.add(asteroid);
  }
  return group;
}