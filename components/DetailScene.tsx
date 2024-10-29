"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import BoxModel from './BoxModel';
import useBoxSize from "@/hooks/useBoxSize";

export default function DetailScene() {

    const boxSize = useBoxSize();
      
    return (
        <Canvas className="relative h-svh">
            <ambientLight intensity={1.5} />
            <directionalLight position={[2, 1, 1]} intensity={1} />
            <BoxModel boxSize={boxSize} />
            <OrbitControls 
                enableZoom={true} 
                enablePan={false} 
                maxPolarAngle={Math.PI / 2} // Limits vertical rotation
                minPolarAngle={Math.PI / 2} // Prevents vertical rotation
            />
        </Canvas>
    );
}
