'use client';

import React, { Suspense } from 'react';
import NavBar from '@/components/NavBar';
import Scene from '@/components/Scene';
import { planets } from '@/config/config';
import Loading from '@/components/Loading';

export default function Home() {
  return (
    <div>
      <NavBar />
      <Suspense fallback={<Loading />}>
        <Scene planets={planets} />
      </Suspense>
    </div>
  );
}
