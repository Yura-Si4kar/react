'use client';
import React from 'react';
import { Planet as PlanetsTypes } from '../types/type';
import { useThreeScene } from '@/hooks/useThreeScene';

type PlanetsProps = {
  planets: PlanetsTypes[];
};

const Scene: React.FC<PlanetsProps> = ({ planets }) => {
  const sceneRef = useThreeScene(planets);  // Використовуємо хук для створення сцени

  return (
    <div ref={sceneRef} style={{ width: '100%', height: '100%' }} />
  );
};

export default Scene;
