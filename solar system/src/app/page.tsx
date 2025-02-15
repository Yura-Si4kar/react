import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Scene from '@/components/Scene';
import { planets } from '@/config/config';

export default function Home() {
  return (
    <div>
      <NavBar />
      <Scene planets={planets} />
    </div>
  );
}
