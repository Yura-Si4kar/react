import { useEffect, useRef } from 'react';
import * as Three from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Planet as PlanetsTypes } from '../types/type';
import { createAsteroidBelt, createPlanet, createSatellite, createStarField, createSun, createOrbitTrajectory } from '@/3d-objects/spaceObjects';
import { useStore } from '@/store/store';

export function useThreeScene(planets: PlanetsTypes[]) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { trajectory } = useStore();

  // Реф для збереження обраного об’єкта
  const targetObjectRef = useRef<Three.Object3D | null>(null);
  // Флаг, що вказує, чи в режимі "слідування"
  const followModeRef = useRef<boolean>(false);

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
      
      if (!trajectory) { 
        // Додаємо траєкторію руху планети
        const orbitTrajectory = createOrbitTrajectory(planet.distance);
        scene.add(orbitTrajectory);  
      }

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
          if (!trajectory) {
            // За потребою, можна також додати траєкторію для супутника
            const moonOrbit = createOrbitTrajectory(moon.distance);
            mesh.add(moonOrbit);
          }
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

      // Оновлюємо орбітальний рух планет та їх обертання
      planetData.forEach(({ pivot, mesh, orbitSpeed, rotationSpeed }) => {
        pivot.rotation.y += orbitSpeed;
        mesh.rotation.y += rotationSpeed;
      });
      // Оновлюємо рух супутників
      moonData.forEach(({ pivot, mesh, orbitSpeed, rotationSpeed }) => {
        pivot.rotation.y += orbitSpeed;
        mesh.rotation.y += rotationSpeed;
      });
      
      asteroidBelt.rotation.y += 0.001;

      // Якщо режим слідування увімкнено, оновлюємо позицію камери
      if (followModeRef.current && targetObjectRef.current) {
        // Отримуємо світову позицію об'єкта
        const objectWorldPos = new Three.Vector3();
        targetObjectRef.current.getWorldPosition(objectWorldPos);
        // Обираємо відступ від об'єкта для позиціонування камери
        const offset = new Three.Vector3(0, 0, 100);
        const desiredPos = objectWorldPos.clone().add(offset);
        // Плавне наближення камери до бажаної позиції
        camera.position.lerp(desiredPos, 0.05);
        // Оновлюємо ціль контролів, щоб камера завжди дивилася на об'єкт
        controls.target.lerp(objectWorldPos, 0.05);
      }

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

    // Обробник подвійного кліку
    const onDblClick = (event: MouseEvent) => {
      const mouse = new Three.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      const raycaster = new Three.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        // Зберігаємо об'єкт для подальшого слідування
        targetObjectRef.current = intersects[0].object;
        followModeRef.current = true;

        // Початкове переміщення камери за допомогою gsap для більшого "вау"-ефекту
        const objectWorldPos = new Three.Vector3();
        targetObjectRef.current.getWorldPosition(objectWorldPos);
        const offset = new Three.Vector3(0, 0, 300);
        const targetPosition = objectWorldPos.clone().add(offset);

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

    renderer.domElement.addEventListener('dblclick', onDblClick, false);

    // Cleanup-функція
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('dblclick', onDblClick);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [planets, trajectory]);

  return containerRef;
}
