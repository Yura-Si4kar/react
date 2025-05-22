import { useEffect, useRef } from 'react';
import * as Three from 'three';
import gsap from 'gsap';
import { Planet as PlanetsTypes } from '../types/type';
import { useStore } from '@/store/store';
import { initializeThree } from '@/utils/initializeThree';
import { setupPlanets } from '@/utils/setupPlanets';
import { createStarField } from '@/objects/createStarField';
import { createSun } from '@/objects/createSun';
import { createAsteroidBelt } from '@/objects/createAsteroidBelt';

export function useThreeScene(planets: PlanetsTypes[]) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { trajectory } = useStore();

  // Реф для збереження обраного об’єкта та режиму слідування
  const targetObjectRef = useRef<Three.Object3D | null>(null);
  const followModeRef = useRef<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;
    Three.Cache.enabled = true;

    // 1. Ініціалізація сцени, камери, рендерера, контролерів та текстурного завантажувача
    const { scene, camera, renderer, controls, textureLoader } = initializeThree();

    // Додаємо фон, Сонце та пояс астероїдів
    const starField = createStarField(textureLoader);
    const sun = createSun(textureLoader);
    const asteroidBelt = createAsteroidBelt(textureLoader);
    scene.add(starField, sun, asteroidBelt);

    // 2. Створення планет і супутників із розділенням логіки
    const { planetData, moonData } = setupPlanets(planets, textureLoader, scene, trajectory);

    // Додаємо додаткове освітлення
    const ambientLight = new Three.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new Three.PointLight(0xffffff, 1, 100000);
    pointLight.position.set(0, 0, 100);
    scene.add(pointLight);

    // 3. Анімаційний цикл
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Оновлення обертання планет
      planetData.forEach(({ pivot, mesh, orbitSpeed, rotationSpeed }) => {
        pivot.rotation.y += orbitSpeed;
        mesh.rotation.y += rotationSpeed;
      });
      // Оновлення обертання супутників
      moonData.forEach(({ pivot, mesh, orbitSpeed, rotationSpeed }) => {
        pivot.rotation.y += orbitSpeed;
        mesh.rotation.y += rotationSpeed;
      });
      // Плавне обертання пояса астероїдів
      asteroidBelt.rotation.y += 0.001;

      // Якщо увімкнено режим слідування, оновлюємо камеру кожен кадр
      if (followModeRef.current && targetObjectRef.current) {
        const objectWorldPos = new Three.Vector3();
        targetObjectRef.current.getWorldPosition(objectWorldPos);
        const offset = new Three.Vector3(0, 0, 100);
        const desiredPos = objectWorldPos.clone().add(offset);
        camera.position.lerp(desiredPos, 0.05);
        controls.target.lerp(objectWorldPos, 0.05);
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 4. Обробка подій
    window.addEventListener('resize', onWindowResize);
    renderer.domElement.addEventListener('dblclick', onDblClick);

    // 5. Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      renderer.domElement.removeEventListener('dblclick', onDblClick);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };

    // Функція обробки зміни розміру вікна
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Функція обробки подвійного кліку: вибір об'єкта і старт слідування
    function onDblClick(event: MouseEvent) {
      const mouse = new Three.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
      const raycaster = new Three.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        targetObjectRef.current = intersects[0].object;
        followModeRef.current = true;

        const objectWorldPos = new Three.Vector3();
        targetObjectRef.current.getWorldPosition(objectWorldPos);
        const offset = new Three.Vector3(0, 0, 300);
        const targetPosition = objectWorldPos.clone().add(offset);

        gsap.to(camera.position, {
          duration: 1,
          x: targetPosition.x,
          y: targetPosition.y,
          z: targetPosition.z,
          onUpdate: () => { controls.update(); }
        });
      }
    }
  }, [planets, trajectory]);

  return containerRef;
}