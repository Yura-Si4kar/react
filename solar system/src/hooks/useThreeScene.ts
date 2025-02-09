import { useEffect, useRef } from 'react';
import * as Three from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Planet as PlanetsTypes } from '../types/type';
import { createAsteroidBelt, createPlanet, createSatellite, createStarField, createSun } from '@/3d-objects/spaceObjects';

export function useThreeScene(planets: PlanetsTypes[]) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    Three.Cache.enabled = true;

    // Створення сцени, камери та рендерера
    const scene = new Three.Scene();
    const camera = new Three.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      110999
    );
    camera.position.set(0, 0, 100);

    const renderer = new Three.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Створення контролерів
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 10;
    controls.maxDistance = 14999;

    const textureLoader = new Three.TextureLoader();
    // Додаємо фон (зоряне небо)
    const starField = createStarField(textureLoader);
    // Додаємо Сонце
    const sun = createSun(textureLoader);
    
    // Створюємо планети та супутники
    const planetPivots: { pivot: Three.Object3D; speed: number }[] = [];
    const moonPivots: { pivot: Three.Object3D; speed: number }[] = [];

    planets.forEach((planet) => {
      // Створення планети – отримуємо і pivot, і mesh (саму планету)
      const { pivot, mesh } = createPlanet(planet, textureLoader);
      scene.add(pivot);
      planetPivots.push({
        pivot,
        speed: planet.speed
      });

      // Якщо у планети є супутники, додаємо їх як дочірні об'єкти планетного mesh
      if (planet.moons) {
        planet.moons.forEach((moon) => {
          const { pivot: moonPivot } = createSatellite(moon, textureLoader);
          // ВАЖЛИВО: додаємо півот супутника до planet.mesh, а не до pivot
          mesh.add(moonPivot);
          moonPivots.push({
            pivot: moonPivot,
            speed: moon.speed
          });
        });
      }
    });

    // Створюємо пояс астероїдів
    const asteroidBelt = createAsteroidBelt(textureLoader);

    // Додаємо освітлення
    const ambientLight = new Three.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new Three.PointLight(0xffffff, 1, 100000);
    pointLight.position.set(0, 0, 100);

    scene.add(starField, pointLight, sun, asteroidBelt);

    // Анімаційна функція
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      planetPivots.forEach(({ pivot, speed }) => {
        pivot.rotation.y += speed;
      });
      moonPivots.forEach(({ pivot, speed }) => {
        pivot.rotation.y += speed;
      });
      asteroidBelt.rotation.y += 0.001;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Обробка зміни розміру вікна
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup-функція
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [planets]);

  return containerRef;
}
