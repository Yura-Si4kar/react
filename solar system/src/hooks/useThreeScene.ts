import { useEffect, useRef } from 'react';
import * as Three from 'three';
import gsap from 'gsap';
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
    camera.position.set(0, 100, 500);

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
    const planetData: { pivot: Three.Object3D; mesh: Three.Mesh; orbitSpeed: number; rotationSpeed: number }[] = [];
    const moonData: { pivot: Three.Object3D; mesh: Three.Mesh; orbitSpeed: number; rotationSpeed: number }[] = [];

    planets.forEach((planet) => {
      const { pivot, mesh } = createPlanet(planet, textureLoader);
      scene.add(pivot);
      planetData.push({
        pivot,
        mesh,
        orbitSpeed: planet.speed,
        rotationSpeed: planet.rotationSpeed || 0
      });

      if (planet.moons) {
        planet.moons.forEach((moon) => {
          const { pivot: moonPivot, mesh: moonMesh } = createSatellite(moon, textureLoader);
          mesh.add(moonPivot);
          moonData.push({
            pivot: moonPivot,
            mesh: moonMesh,
            orbitSpeed: moon.speed,
            rotationSpeed: moon.rotationSpeed || 0
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

      // Оновлюємо орбітальний рух планет та обертання навколо власної осі
      planetData.forEach(({ pivot, mesh, orbitSpeed, rotationSpeed }) => {
        pivot.rotation.y += orbitSpeed;
        mesh.rotation.y += rotationSpeed;
      });
      // Оновлюємо орбітальний рух супутників та їх осьове обертання
      moonData.forEach(({ pivot, mesh, orbitSpeed, rotationSpeed }) => {
        pivot.rotation.y += orbitSpeed;
        mesh.rotation.y += rotationSpeed;
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

    // Додаємо обробник кліків
    const onClick = (event: MouseEvent) => {
      const mouse = new Three.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      const raycaster = new Three.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const selectedObject = intersects[0].object;

        // Оновлюємо ціль OrbitControls
        controls.target.copy(selectedObject.position);

        // Визначаємо відстань від камери до об'єкта
        const offset = new Three.Vector3(0, 0, 100);
        const targetPosition = selectedObject.position.clone().add(offset);

        // Анімуємо камеру для плавного переходу
        gsap.to(camera.position, {
          duration: 1,
          x: targetPosition.x,
          y: targetPosition.y,
          z: targetPosition.z,
          onUpdate: () => {
            controls.update();
          }
        });
      }
    };

    renderer.domElement.addEventListener('dblclick', onClick, false);

    // Cleanup-функція
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('dblclick', onClick);
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