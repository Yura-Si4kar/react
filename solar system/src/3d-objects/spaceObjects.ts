import * as Three from 'three';
import { Planet as PlanetsTypes } from '../types/type';
import { Moon as MoonTypes } from '../types/type';

// Зоряне поле – збільшено до 12000 одиниць, щоб охопити всю сцену
export function createStarField(textureLoader: Three.TextureLoader): Three.Mesh {
  const geometry = new Three.SphereGeometry(91000, 32, 32);
  const texture = textureLoader.load('/images/stars.jpg');
  const material = new Three.MeshBasicMaterial({ map: texture, side: Three.BackSide });
  return new Three.Mesh(geometry, material);
}

// Сонце – встановлюємо радіус 50 (порівняно з орбітою Землі ≈300)
export function createSun(textureLoader: Three.TextureLoader): Three.Mesh {
  const geometry = new Three.SphereGeometry(100, 32, 32); // Збільшено радіус на 50
  const texture = textureLoader.load('/images/sun.jpg');
  const material = new Three.MeshBasicMaterial({ map: texture, color: 0xffff00 });
  return new Three.Mesh(geometry, material);
}

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