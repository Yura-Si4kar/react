import NavBar from '@/components/NavBar';
import Scene from '@/components/Scene';
import { planets } from '@/config/config';
import React from 'react';

export default function Home() {

  return (
    <div>
      <NavBar />
      <Scene planets={planets}/>
    </div>
  );
}
