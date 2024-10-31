"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GlobeModel from '../models/GlobeModel';
import { Suspense, useRef } from "react";
import Loader from "../Loader";
import * as THREE from "three";
import { PHILIPPINE_SPOTLIGHT } from "@/constants/coordinates";
import { useWindowSize } from "@/hooks/useWindowSize";

export default function GlobeScene() {

    const { isMobile } = useWindowSize();
    const sphereScale = isMobile ? 1.5 : 2.2;

    return (
        <Canvas 
            gl={{ antialias: true }} 
            dpr={[1, 1.5]} 
            camera={{ position: [0, 0, -5] }} 
            className={`${!isMobile && 'animate-wiggleonce'} relative h-svh`}
        >
            <SpotLightAnimate />
            <ambientLight intensity={0.5} />
            <pointLight position={[-6.8, 2.5, -10]} decay={0} intensity={5} />
            <Suspense fallback={<Loader />}>
                <GlobeModel sphereScale={sphereScale}/>
            </Suspense>
            <OrbitControls 
                enableZoom={true} 
                enablePan={false} 
                minDistance={3}
                maxDistance={6}
            />
        </Canvas>
    );
}

function SpotLightAnimate() {
    const spotLightRef = useRef<THREE.SpotLight>(null);
    const maxIntensity = 5;
    const minIntensity = 1;

    useFrame(({ clock }) => {
      const time = clock.getElapsedTime();
      if (spotLightRef.current) {
        spotLightRef.current.intensity =
          minIntensity + Math.abs(Math.sin(time)) * (maxIntensity - minIntensity);
      }
    });
  
    return (
      <spotLight
        ref={spotLightRef}
        position={PHILIPPINE_SPOTLIGHT}
        angle={0.045}
        penumbra={1}
        decay={0}
        intensity={maxIntensity} // Initial intensity
      />
    );
}