import * as Three from 'three';

// Функція для створення лінії-орбіти
export function createOrbitTrajectory(distance: number): Three.Line {
  const segments = 128; // Задаємо кількість сегментів для плавності
  const points: Three.Vector3[] = [];
  
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    // Створюємо точки кола на площині XZ (можна змінити, якщо орбіта має нахил)
    points.push(new Three.Vector3(
      distance * Math.cos(theta),
      0,
      distance * Math.sin(theta)
    ));
  }
  
  const geometry = new Three.BufferGeometry().setFromPoints(points);
  const material = new Three.LineBasicMaterial({ color: 0x888888, linewidth: 1 });
  return new Three.Line(geometry, material);
}