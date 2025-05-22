import * as Three from 'three';
import { Planet as PlanetsTypes } from '../types/type';
import { Objects as ObjectData } from '../types/type';
import { createPlanet } from '@/objects/createPlanet';
import { createOrbitTrajectory } from '@/objects/createOrbitTrajectory';
import { createSatellite } from '@/objects/createSatellite';

export function setupPlanets(
  planets: PlanetsTypes[],
  textureLoader: Three.TextureLoader,
  scene: Three.Scene,
  trajectory: boolean
) {
  const planetData: ObjectData[] = [];
  const moonData: ObjectData[] = [];

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
          // За потребою, додаємо траєкторію для супутника
          const moonOrbit = createOrbitTrajectory(moon.distance);
          mesh.add(moonOrbit);
        }
      });
    }
  });

  return { planetData, moonData };
}